---
title: 'Wasmer enables FaaS'
excerpt: 'Build your FaaS platform or application with Wasmer.'
date: '2021-07-15T00:00:00.000Z'
author: Wiqar Chaudry
published: false
---

Software development has evolved from 3-tier applications to microservices enabled by virtualization and cloud computing. Microservices and containerization dramatically improve the separation of concerns for large software applications. However, microservices are complex and challenging to deploy, orchestrate, manage, and scale.

Initially introduced as PiCloud in 2010, FaaS gained market traction and mass adoption in 2014, when Amazon Web Services launched AWS Lambda, its first-generation FaaS product. Since then, every cloud provider supports some form of a FaaS or serverless offering.

FaaS simplifies software development by reducing the smallest deployable unit of code to a function with a single responsibility. Developers can compose complex applications with many small functions. Individual functions or entire applications composed of many functions can deploy to any major cloud providers' FaaS platforms. FaaS-based applications.

**[Customer Case Study Available!](https://wasmer.io/case-studies/fluence)**

## FaaS Advantages

There are many advantages to composing applications with functions, including:

- **Costs -** FaaS can dramatically lower operating and hosting costs, pay only for what you use based on demand or consumption metrics.
- **Simplified Scalability -** Focus on application logic and offload application scalability to the platform provider.
- **Agile Development -** Rapidly build, deploy, and support interoperability with other technologies like containerization.
- **Lower Latency -** Cloud providers like Amazon, Microsoft, and Edge providers like Cloudflare use their network and infrastructure to deploy functions closer to users. (Also known as Edge Computing.)
- **Reduce Complexity -** Developers don't need to worry about managing complex and expensive infrastructure like Kubernetes to deploy and orchestrate their applications.

## Challenges

Advantages for FaaS are plenty. However, as with any new technology, there are tradeoffs, including:

- **Cold Starts -** Functions are not always available in memory. The resulting delay in execution disqualifies FaaS from certain types of applications or forces developers to deploy workarounds that add to the cost of deployment.
- **Vendor Lock-in -**  Functions deployed to AWS Lambda may become difficult to push to a different cloud provider, especially if other AWS services like S3 or RDS are critical components of your application's architecture.
- **Local Reproducibility -** Testing or reproducing vendor platform functionality on local infrastructure is complex and may rely on community-supported workarounds (e.g., Miniflare).
- **Costs -** FaaS platforms are fully managed services obscure to the user and often create unintended costs during peak activity if left unsupervised.
- **Security and Compliance -**  Fully managed platforms may be slow to remediate security issues or may not fully adhere to regulations specific to your business needs (e.g., GDPR, SOX, HIPPA, etc.)

## Wasmer for FaaS

Wasmer is the ideal solution for server-side WebAssembly (Wasm) applications, and WebAssembly is the perfect solution for FaaS applications. Wasm is at the forefront of the next big wave in software architecture and design. Developers can code in various programming languages that compile to Wasm, test locally, and deploy universally compatible Wasm modules to any infrastructure.

## Why Wasmer

Wasmer is a market leader for enabling WebAssembly on the server. It nearly eliminates all the challenges developers must deal with to fully adopt FaaS as a part of their application development strategy. For instance:

- **Fast Startup Times -** Wasmer enables precompilation of Wasm modules for ultra-fast and responsive startup times.
- **No Vendor Lock-in -** Wasm modules get compiled to universal binaries that can be adapted to run on any provider's infrastructure quickly.
- **Local Reproducibility -** The Wasmer Runtime makes it possible to run and test all of your service components locally.
- **Legacy Application Support -** Compile legacy server-side code to WebAssembly and run it as a function.
- **Development Efficiency -** Wasm modules can comprise compiled code from various languages allowing developers to work with the languages they know and trust to eliminate costs associated with developing platform-specific functions.

**[Customer Case Study Available!](https://wasmer.io/case-studies/fluence)**

### **About Wasmer**

Headquartered in San Francisco, CA, Wasmer Inc. is behind the popular open-source WebAssembly runtime Wasmer. In addition to the Wasmer runtime, the company has made significant investments in [WAPM](https://wapm.io/), the WebAssembly Package Manager, and many other open-source projects in the WebAssembly ecosystem.

**Our mission is to make software universally available**. We are committed to the open-source community and strive to contribute to developers and companies worldwide to help make Wasmer and WebAssembly a universal standard.