---
title: 'Wasmer enables portable AI'
description: 'Wasmer enables portability for AI and Tiny ML applications.'
publishedAt: '2021-07-15T00:00:00.000Z'
author:
  name: 'Wiqar Chaudry'
  picture: '/images/wiqar.png'
status: 'published'
---

Machine learning and AI (ML/AI) enable everyday "things" like Siri/Alexa, Nest thermostats, or more complex applications like autonomous vehicles. Better connectivity (fiber, 5G, etc.), the proliferation of connected devices (IoT), and the need to solve increasingly complex problems in healthcare or cybersecurity are the driving forces behind modern ML/AI applications.

Current ML frameworks like TensorFlow or PyTorch help simplify and streamline ML/AI workflows, dramatically accelerating adoption. However, as infrastructure moves out of the data center and into the real world (edge computing), machine learning must follow. New edge computing infrastructure and applications require ML/AI models to contextualize learning based on data locality and proximity.

**[Customer Case Study Available!](https://wasmer.io/case-studies/hotg)**

## TinyML

TinyML is a data science discipline that deals with machine learning applications on tiny computing devices. For example, a mobile device or Raspberry Pi with limited hardware resources are candidates for TinyML. Software solutions for TinyML include TensorFlow Lite or PyTorch Mobile, designed for low power limited resource devices, enabling models' portability to infrastructures outside of the data center. However, TensorFlow Lite or PyTorch Mobile do not solve the challenge of universally deploying ML/AI applications to heterogeneous hardware.

## Challenges

The faster the world transforms and digitizes around us, the greater the need for ML/AI. However, as digital infrastructures proliferate outside traditional data center environments, ML/AI applications must adapt to overcome many environmental constraints. Key constraints and challenges include:

**Model Portability -** It is difficult and expensive to collect data or deploy models to heterogeneous infrastructure and devices.

**Data Explosion -** More devices mean more data must be collected, processed, and incorporated into ML/AI models.

**Limited Connectivity -** High-speed networks are not always available, or devices may be offline for extended periods.

**Limited Power -** Training ML/AI models require significant infrastructure resources and power that may not always be available outside data centers.

**Security -** ML/AI applications on IoT devices are especially susceptible to common security risks like data poisoning or transfer learning attacks where existing trained models are hijacked for malicious intent.

## Wasmer for Machine Learning

Wasmer is the ideal solution for server-side WebAssembly applications, and WebAssembly is the perfect solution for TinyML applications. Compile your favorite TinyML solution like TensorFlow Lite to WebAssembly or [ONNX](https://onnx.ai/) and make it universally available on any infrastructure.

## Why Wasmer

Wasmer is a market leader for enabling WebAssembly on the server. It nearly eliminates all the challenges developers must deal with for deploying machine learning applications in and outside of data center environments. Benefits include:

**Ultra-Portability -** WebAssembly enables universal binaries, and the Wasmer Runtime ensures ML/AI Wasm apps run on any device.

**Small Footprint -** Wasmer's headless and architecture-specific compilation options scale down to the more resource-constrained devices.

**Performance -** Wasmer provides multiple engines and compilers to help developers optimize their deployments for their specific performance requirements.

**Security -** Encrypt (homomorphic encryption) and isolate server-side WebAssembly from host devices explicitly enabling access only to required components or sensor data.

**[Customer Case Study Available!](https://wasmer.io/case-studies/hotg)**

### **About Wasmer**

Headquartered in San Francisco, CA, Wasmer Inc. is behind the popular open-source WebAssembly runtime Wasmer. In addition to the Wasmer runtime, the company has made significant investments in [WAPM](https://wapm.io/), the WebAssembly Package Manager, and many other open-source projects in the WebAssembly ecosystem.

**Our mission is to make software universally available**. We are committed to the open-source community and strive to contribute to developers and companies worldwide to help make Wasmer and WebAssembly a universal standard.
