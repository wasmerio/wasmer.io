---
title: 'Fluence Case Study'
excerpt: 'Fluence Labs is the company behind Fluence, an open protocol, and platform for decentralized applications.'
date: '2021-06-25T15:35:07.322Z'
author: 'Syrus Akbary'
published: false
---

# Fluence Labs

Fluence Labs is the company behind Fluence, an open protocol, and platform for decentralized applications. Fluence aims to democratize peer-to-peer computation and APIs, enabling a decentralized network that provides secure access to public and private data sources. The grand vision for Fluence is to be the default protocol for machine-to-machine communication and integration.

_"We want Fluence to be the default language that robots speak. When two robots meet each other, they should speak the Fluence Protocol."_ **-** **Dmitry Kurinskiy, CTO and co-founder at Fluence Labs.**

## How Fluence Works

Fluence offers developers extremely flexible and broad methods for composing software. Customers can compose and recompose, use and reuse running software without compromising security. Backend services hosted on the platform become building blocks for higher-level services that deliver new customer experiences without redeploying anything. The system supports a small set of security primitives that correspond to π-Calculus operations, delivering on the promise of sandboxing and security without strict boundaries.

At its core, the platform comprises a set of software components known as Aquamarine. **Aqua** is a composition language and interpreter that allows developers to compose their applications as a workflow. Leveraging the principles of π-Calculus, the system expresses, coordinates, and executes programs concurrently on a single-use logical network with **Marine,** a WebAssembly runtime based on **Wasmer.**

## Fluence in Action

A major Fluence Labs customer is leveraging the Fluence Platform to create a messaging application with open source services hosted within Marine. Fluence enables customers and customer's customers to deploy chat backends within the network. Two tiers of customers host their nodes and servers wherever they like and seamlessly participate in the global chat network. WebAssembly-based API wrappers provide sandboxed access to external data and resources. These external resources can be consumed within the messaging app and become a part of the user experience.

## Challenges

Realizing the promise of improving connectivity, countless networks, software solutions, and real-world connected devices, Fluence Labs discovered the need for a composability and integration layer. To deliver, the company needed to:

- Determine how to realistically compose new capabilities using the existing capabilities of two different open networks
- Normalize the difference between various APIs written in multiple languages
- Handle infrastructure heterogeneity between nodes in a network
- Enable their customers to create pragmatic, performant, and secure solutions at scale.

Given the complexity that Fluence needed to abstract, the Fluence team placed a heavy bet on WebAssembly. Initially, Java-heavy bias led Fluence down the path of compiling WebAssembly bytecode into Java bytecode for the JVM. However, the team quickly realized the limitations of this approach and the future potential for WebAssembly. As a result, the company ultimately settled on Wasmer as the server-side runtime for WebAssembly applications.

## Why Wasmer

Fluence carefully considered Wasmtime and Wasmer as options for a server-side WebAssembly runtime. At the time of their evaluation, the Fluence team gave high marks to Wasmtime for supporting a broader set of WebAssembly features. However, Wasmer's support for language integrations and LLVM closely aligned with their need to expand and normalize coverage for APIs across many languages. In addition to Wasmer's technical alignment with Fluence's vision, the company also cited superior community support and team responsiveness as deciding factors.

"The most important advantage of using Wasmer is support and the Wasmer team. The level of support Wasmer provides would be difficult with other runtimes and wouldn't result in the same type of value that Wasmer can provide the community." **-** **Mike Voronov, R&D Engineer at Fluence Labs.**

## About Wasmer

Headquartered in San Francisco, CA, Wasmer Inc. is behind the popular open-source WebAssembly runtime Wasmer. In addition to the Wasmer runtime, the company has made significant investments in [WAPM](https://wapm.io/), the WebAssembly Package Manager, and many other open-source projects in the WebAssembly ecosystem.
