---
title: 'WAPM: A Newly Renovated Home For WebAssembly'
excerpt: 'WAPM: A Newly Renovated Home For WebAssembly.'
date: '2021-07-15T00:00:00.000Z'
author: Wiqar Chaudry
published: false
---

We are very excited to announce that the next-generation experience for [WAPM](https://wapm.io/), Wasmer's WebAssembly package manager is live. Over the past 12-months beginning with the Wasmer 1.0 release, followed by the 2.0 and 2.1 releases, downloads for the Wasmer runtime increased exponentially. Community support for WebAssembly and the Wasmer Runtime has never been higher. Apps, libraries, and smart contracts leverage Wasmer to run in production environments at scale. It was time to upgrade WAPM and create a home suitable for production-ready WebAssembly.

![WAPM homepage](/images/blog/wapm-revamp/intro.png)

# What's New In WAPM

We decided to redesign the new WAPM user experience with the community's immediate and future needs in mind. Let's pick things up from the beginning.

## Meet The Community

Behind every WebAssembly package, there is a developer or maybe multiple developers! It's time to get to know them. Every WAPM account now features a profile page for its members. You can create an account or use your existing account to upload an avatar, add a bio, and provide links to external sites like Github, Twitter, or personal websites.

![WAPM User page](/images/blog/wapm-revamp/user.png)

## Package Experience

It's all about WebAssembly packages, of course. WAPM is optimized to help developers search, discover, and use packages as efficiently as possible. A new explore page combines intelligent text-based search with filtering and sorting options to quickly find what you're looking for. Creating and publishing packages on WAPM has never been easier. Just use the built-in guide to download and publish packages.

**Run Packages Online**

![WAPM Shell](/images/blog/wapm-revamp/shell.png)

A brand-new in-browser terminal experience lets you safely interact with WebAssembly apps online. WAPM automatically detects `run` and `install` commands within package `Readme` and converts them into executable links. Clicking the links runs the `.wasm` files in the browser-based terminal. Using the command line within the terminal unlocks additional features like local filesystem access.

**Package Notifications**

Stay update-to-date with packages or show your love with the new `Watch` and `Like` features. Watching a package will automatically notify you when a new package version is available or if a specific version of a package is archived/deprecated. Liking packages increases the popularity of packages and ensures that the developer and the community stay motivated. So be liberal with the likes!

**Package Lifecycle Management**

WAPM also enables lifecycle management through package settings. Developers can easily archive, restore, or transfer packages.

## A Social Affair

The most critical goals for WAPM are to enable, grow, and expand the WebAssembly community at large. We implemented two essential features to help achieve these goals, Package Collaboration and Namespaces.

**Package Collaboration**

Everything is more fun with friends! Package collaboration enables maintaining and creating WebAssembly packages with other developers a breeze. Just go to your package settings and invite your friends. WAPM automatically invites existing WAPM users by username or email address. If your collaborators are not members of WAPM, don't worry, we'll send them an email invite.

![WAPM Settings](/images/blog/wapm-revamp/settings.png)

**Namespaces**

Like user profiles, you can create a namespace, a globally unique identifier for a set of WebAssembly packages, and add a description and external links. Namespaces let you group, manage, and collaborate on various packages because some packages just belong together.

# What's Next For WAPM

We've just scratched the surface with what WAPM is capable of delivering in the new redesign. Here is a sneak-peak of what you can expect in the coming days and weeks.

**Native Executables**

Many of you may already be familiar with Wasmer Runtime's ability to compile native executables. WAPM will soon allow developers to use a cloud compiler to automatically generate native executables for various hardware architectures and make them available for download on WAPM.io.

There's a lot more, but we can't give everything away here. If you want to be in the know, sign-up for [WAPM](https://wapm.io/), become an insider, and we'll keep you posted.

# About Wasmer

Headquartered in San Francisco, CA, Wasmer Inc. is behind the popular open-source WebAssembly runtime Wasmer. In addition to the Wasmer runtime, the company has made significant investments in [WAPM](https://wapm.io/), the WebAssembly Package Manager, and many other open-source projects in the WebAssembly ecosystem.

**Our mission is to make software universally available**. We are committed to the open-source community and strive to contribute to developers and companies worldwide to help make Wasmer and WebAssembly a universal standard.
