---
title: "WebAssembly On Amazon Lambda: Lessons Learned"
excerpt: "WebAssembly On Amazon Lambda: Lessons Learned"
date: "2022-06-17T12:00:00.000Z"
author: Manos
published: false
---

At Wasmer we recently did an internal hackathon to see how easy or difficult it might be to host an application with WebAssembly components on AWS Lambda. We split in two teams with the goal of making a funny project with actual software behind it.

In this article I’ll analyze what we built and what we learned along the way.

Coming up with novel ideas is notoriously hard, so we set the default challenge to be a "*social network for pets*", a funny enough premise but with some technical requirements:

- The site must use **AWS Lambda** as the serverless platform.
- There should be **WebAssembly components** running as Lambda functions.
- The Wasm files must be eventually published and hosted in [wapm.io](http://wapm.io/).

The hackathon was time-constrained and we kept stumbling upon more obstacles and errors than we initially anticipated.

The one team successfully got code to run on Lambda, but their application fell short on features. The other team designed some backend features but because of technical issues could not get the lambda function running. Ultimately we were satisfied with the results and decided to merge the two concepts into one and build a more or less presentable version of it afterwards.

## What we built

We built a social network for pets. The pets (i.e. user accounts) posted story updates (i.e. photos, likes, shares). Every story update is appended in a homemade "blockchain" running in WebAssembly in the Lambda worker. The app’s entire business logic is encoded in **the game rules** (see: below).

- **Blockochen**: [https://github.com/pitpet-xyz/blockochen](https://github.com/pitpet-xyz/blockochen).
    
    The toy "blockchain". Since it's not really decentralized (we're hosting one worker of it), there's no concept of mining or tokens, it is essentially just a [Merkle Tree](https://en.wikipedia.org/wiki/Merkle_tree) compiled to WASM. The WASM module receives in the chain state and outputs it without caring about storage.
    
- **Petstore Lambda chain**: [https://github.com/pitpet-xyz/petstore_lambda_chain](https://github.com/pitpet-xyz/petstore_lambda_chain)
    
    The integration for using the `blockochen.wasm` inside Amazon Lambda. It's a Lambda function written in Rust with the `aws` Rust sdk. It receives JSON requests, launches `blockochen` using Wasmer and prints the results as an HTTP response. It stores the chain state on `s3` or on Lambda's `tmpfs`.
    
- **Pitpet web**: [https://github.com/pitpet-xyz/pitpet-web](https://github.com/pitpet-xyz/pitpet-web)
    
    Since the project was time-restrained, I chose to base the web app UI
    on a project of mine that already included the concepts of users
    signing up, posting stories, etc. It's a AGPLv3.0 Django app that powers the
    [https://sic.pm](https://sic.pm/) link aggregator community. The original source repository is here: https://github.com/epilys/sic
    

## Lessons Learned

Amazon Web Services are labyrinthian in scope. I use Firefox for my browsing needs and using the AWS Web UI seems not to support it. I had to download and install Chrome in order to use it. 

### The Good

The ecosystem of tools to work with AWS is plentiful but, diving in, you don't know what works and what not. Deprecated SDKs are not marked as deprecated and official guides for them still exist online.

- Use `cargo-lambda` for building/bundling lambda functions.
- Always use optimized wasm with wasm-opt; WASM files can get large.
- Use `boto3`, the AWS SDK for python3.

### The **Bad**

AWS website is information dense that requires familiarity with its Vendor technologies and services in order to successfully make something. I encountered:

- Opaque errors when uploading a new version of the lambda function: `Error: fork/exec /var/task/bootstrap: permission denied` (solution: reupload the `bootstrap.zip` file again)
- Opaque errors when attempting to edit the "Role" ("Role" is how AWS calls the group of permissions) of the function: It just said "an error occurred" and redirected me back to the Role dashboard. (Afterwards, I realised this only happened with Firefox.)
- Very slow upload->deploy->test->reiterate workflow. If your code is mostly AWS API tied, so you can't test/develop it locally, you're stuck with AWS's sluggish pace of time. And it's slow.

## The Ugly

An unfamiliar workflow.

- Naively thinking a Lambda Function URL would be an HTTP endpoint. It's actually protocol-free (I think!), which is confusing and leads to incorrect assumptions. Hidden in another one of the countless AWS services, HTTP API functionality had to be added and pointed to the lambda function.
- Expecting a small WASI module to compile when the function starts wouldn't take time. It does. The compilation crossed the default 3s time out of AWS lambda. It'd have been  wiser to compile the module into an executable artifact using wasmer and instead run that. Compiling WASM to native code with Wasmer produces fast and native execution.

---

### Mission accomplished! 🎉

Ultimately, we completed the app successfully and gained a greater appreciation for what developers and DevOps engineers must go through daily. The most important lesson learned is that **deploying serverless applications to the cloud is tough**.

A lot more work is needed to simplify building and deploying applications securely and at scale. We learned a lot, and we're excited to take our learnings and turn them into amazing new products and features for the Wasmer and WebAssembly ecosystem.

## Bonus: The “game rules” encoded in the blockchain

All user interactions in [pitpet.xyz](http://pitpet.xyz) go through a set of rules that make up the pitpet game.

1. You sign up by making a new Pet story with a photo of your pet.
2. You must keep your pet story “alive” by frequently tending to it with new posts, likes, etc.
3. If time passes or other pet stories are more active than yours, your pet story ends and you cannot continue. The only choice is then restarting with a new Pet story.

### Here’s how the game rules translate to blockchain interactions:

(Note: Everything in *italics* was not actually implemented.)

![petstory-lifetime.excalidraw.svg](/images/blog/pitpet/petstory-lifetime.excalidraw.svg)

- Creating an account is a “birth” even encoded into the blockchain. This gives you basically a “birth hash” that is signed by your account password. So it’s an NFT of your pet.
- All social interactions are associated with a target “birth hash” and they are encoded in the blockchain.
- *The only way for a pet owner to push an interaction event for their own “birth hash” is if they “pay” with **treat** tokens. The tokens go into the pet’s wallet and can only be retrieved after the pet’s death.*
- Taking inspiration from the classic Tamagotchi game:

> *The average Tamagotchi lifespan is around 12 days, with the lowest around age 7 and the highest around age 25*
> 
- Arbitrarily, we set that if there’s no interaction event associated with a specific “birth hash” within the last 15 blocks, the pet is dead. Or to put it less morbidly, the pet’s story ends. *The player can choose to mint a special Story End event that allows them access to their tokens*
- *Every X hours, if there hasn’t been any activity at all, miners have the opportunity to mine a “time” block which awards them with a small amount of treat tokens. This is only accepted by the algorithm and the network if there hasn’t been activity already according to their system clocks. Therefore if the majority of the network agrees at least X hours have passed, a “time” block can be mined. Raison d'être: to emulate the passage of physical time and keep the chain from stagnating still.*
- *Other users can contribute with mining by connection to the blockchain network. Successfully mining a block gives you a small amount of **treat** tokens.*
- *PitPet includes a token exchange market in the app. Because obviously we need at least a 30% cut 😎.*

