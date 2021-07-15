import React from 'react';
import styles from './casestudy.module.css';

export const FluenceComponent = () => {
    return (
        <div className="container sm:text-left md:text-center mx-auto my-page">
            <div className={`text-left ${styles.parent}`}>
                <div className={`text-left ${styles.caseStudyLeft}`}>
                    <a href="https://fluence.network/" target="_blank"><img alt="Fluence Labs" src="/images/case-studies/fluence-labs-logo.svg" width="147px" height="43px"></img></a><br></br>
                    <h3>Case Study</h3><br></br>
                    <p>
                        Fluence Labs has developed a peer-to-peer application platform which allows the creation of applications free of proprietary cloud providers or centralized APIs. Developers can compose and recompose workflows, APIs, and services without compromising security and without relying on centralized intermediaries. Fluence is  democratizing peer-to-peer computation enabling a decentralized network that provides secure access to public and private data sources. The Fluence stack is 100% open source and is maintained and governed by a community of developers.
                    </p><br></br>

                    <h3>How Fluence Works</h3><br></br>
                    <p>
                        Fluence Labs has developed a peer-to-peer application platform that offers highly flexible and broad methods for building applications. Developers can compose and recompose workflows, APIs, and services without compromising security or relying on a centralized intermediary. Backend services hosted on the platform become building blocks for higher-level services that deliver new customer experiences without redeploying anything. Developers use a radically simple method for creating applications that share users, data and are rewarded based on application and service utilization. The system supports a small set of security primitives that correspond to π-Calculus operations, delivering on the promise of sandboxing and security without strict boundaries.
                    </p><br></br>
                    <p>
                        At its core, the platform comprises a set of software components known as Aquamarine. Aqua is a composition language and interpreter that allows developers to compose their applications as a workflow. The system leverages the principles of π-Calculus; it expresses, coordinates, and executes programs concurrently on a single-use logical network with Marine, a WebAssembly runtime based on Wasmer.
                    </p><br></br>
                    <h3>Fluence in Action</h3><br></br>
                    <p>
                        A major Fluence Labs customer is leveraging the Fluence Platform to create a messaging application with open source services hosted within Marine. Fluence enables customers and customer's customers to deploy chat backends within the network. Two tiers of customers host their nodes and servers wherever they like and seamlessly participate in the global chat network. WebAssembly-based API wrappers provide sandboxed access to external data and resources. These external resources can be consumed within the messaging app and become a part of the user experience.
                    </p><br></br>
                </div>
                <div className={`text-left ${styles.caseStudyRight}`}>
                    <br></br><h3>Challenges</h3><br></br>
                    <p>
                        Realizing the promise of improving connectivity, countless networks, software solutions, and real-world connected devices, Fluence Labs discovered the need for a composability and integration layer. To deliver, the company needed to:
                    </p><br></br>
                    <ul className={`text-left ${styles.openlist}`}>
                        <li>Determine how to realistically compose new capabilities using the existing capabilities of two different open networks</li>
                        <li>Normalize the difference between various APIs written in multiple languages</li>
                        <li>Handle infrastructure heterogeneity between nodes in a network</li>
                        <li>Enable their customers to create pragmatic, performant, and secure solutions at scale.</li>
                    </ul><br></br>
                    <p>
                        Given the complexity that Fluence needed to abstract, the Fluence team placed a heavy bet on WebAssembly. Initially, Java-heavy bias led Fluence down the path of compiling WebAssembly bytecode into Java bytecode for the JVM. However, the team quickly realized the limitations of this approach and the future potential for WebAssembly. As a result, the company ultimately settled on Wasmer as the server-side runtime for WebAssembly applications.
                    </p><br></br>
                </div>
                <div class={`text-left ${styles.caseStudyBottom}`}>
                    <h3>Why Wasmer</h3><br></br>
                    <p>
                        Fluence carefully considered different runtimes as options for running server-side WebAssembly. Ultimately, Wasmer was selected as the company's default WebAssembly Runtime. Its support for language integrations and LLVM, closely aligned with Fluence's need to expand and normalize APIs across many languages. In addition to Wasmer's technical alignment with Fluence's vision, the company also cited superior community support and team responsiveness as deciding factors.
                    </p><br></br>
                    <p>
                        <div className={`${styles.quote}`}>"The most important advantage of using Wasmer is support and the Wasmer team. The level of support Wasmer provides would be difficult with other runtimes and wouldn't result in the same type of value that Wasmer can provide the community."<span className={`${styles.important}`}>&nbsp;&nbsp;- Mike Voronov, R&amp;D Engineer at Fluence Labs.</span></div>
                    </p><br></br>
                <h3>About Wasmer</h3><br></br>
                <p>
                    Headquartered in San Francisco, CA, Wasmer Inc. is behind the popular open-source WebAssembly runtime Wasmer. In addition to the Wasmer runtime, the company has made significant investments in WAPM, the WebAssembly Package Manager, and many other open-source projects in the WebAssembly ecosystem.
                </p><br></br>
                <p>
                <span className={`${styles.important}`}>Our mission is to make software universally available.</span> We are committed to the open-source community and strive to contribute to developers and companies worldwide to help make Wasmer and WebAssembly a universal standard.
                </p><br></br>
                <p>
                    <span className={`${styles.important}`}>Fluence’s mission is to make software universally available. </span>We are committed to the open-source community and strive to contribute to developers and companies worldwide to help make Wasmer and WebAssembly a universal standard.
                </p><br></br>
            </div>
        </div>
        </div >
    );
};