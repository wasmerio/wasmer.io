---
title: 'Wasmer Supercharges Blockchain'
excerpt: 'WebAssembly with Wasmer for Blockchain and Smart Contracts.'
date: '2021-07-15T00:00:00.000Z'
author: Wiqar Chaudry
published: true
---

Described initially by a group of researchers in 1991, blockchain gained mass popularity in 2009 when "Satoshi Nakamoto" used it to create the first digital cryptocurrency Bitcoin. Cryptocurrency is the most commonly known utility for blockchain; however, many other use cases like document tracking, monitoring chains of custody for sensitive information, or tracking products in a supply chain can benefit blockchain technologies. (e.g., legal, financial, pharmaceuticals, food production, etc.)

**[Customer Case Study Available!](https://wasmer.io/case-studies/confio)**

## How Blockchains Work

Blockchains comprise data stored in blocks that contain transactional information such as name, transaction value, date, and a hash value that uniquely identifies each transaction. Multiple distributed blocks link together based on hash values creating a blockchain. New transactions trigger updates to each of the blocks in the blockchain with updated information. The distributed nature of blockchain makes it secure and almost tamper-proof.

## Smart Contracts

A critical component of the blockchain workflow is the smart contract, first introduced by Ethereum in 2014.

A smart contract is simply a program that outlines the terms of a transaction. For example, suppose a company wanted to set up a sponsorship fund where funding is only released once a certain number of donors donate. In that case, a smart contract facilitates the transaction to release the funds or returns the funds based on the outcome.

## Challenges

Blockchains enable simple, transparent, and secure transactions. However, the distributed nature of the blockchain creates several challenges for blockchain applications and infrastructure providers.

1. Ensuring that a malicious or poorly written smart contract doesn't crash or block transaction processing for all blockchain users. (JIT-bombs)
2. Supporting determinism for smart contracts on heterogeneous infrastructure (different chipsets and platforms must run a given same smart contract in the same way)
3. Scaling the number of smart contract executions as the number of blocks in a blockchain increases

## Wasmer for Blockchain

Wasmer is the ideal solution for server-side WebAssembly applications. However, blockchain use cases require deterministic compilation and fast canonical code execution on heterogeneous hardware. With its Singlepass compiler, Wasmer is the clear market leader for Blockchain applications and infrastructure.

## Why Wasmer

WebAssembly is the dominant format for executing smart contracts, and Wasmer is the runtime preferred by the cryptocurrency/blockchain market for the following reasons:

**No JIT-bombs:** JIT-bombs slow down or block smart contract processes due to malicious or poorly written code. Wasmer's Singlepass compiler helps eliminate JIT-bombs, enabling blockchain providers with a high-quality-of-service infrastructure for their applications.

**Heterogenous Infrastructure Support:** Wasmer's blockchain infrastructure ensures that the outcome of each smart contract execution returns the same result regardless of the underlying infrastructure. (e.g., x86_64, ARM, etc.)

**Performance:** The Wasmer compiler engines and runtime ensure high-performance compilation and code execution without any miscompiles.

**[Customer Case Study Available!](https://wasmer.io/case-studies/confio)**

### **About Wasmer**

Headquartered in San Francisco, CA, Wasmer Inc. is behind the popular open-source WebAssembly runtime Wasmer. In addition to the Wasmer runtime, the company has made significant investments in [WAPM](https://wapm.io/), the WebAssembly Package Manager, and many other open-source projects in the WebAssembly ecosystem.

**Our mission is to make software universally available**. We are committed to the open-source community and strive to contribute to developers and companies worldwide to help make Wasmer and WebAssembly a universal standard.
