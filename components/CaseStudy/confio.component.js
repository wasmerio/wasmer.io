import React from 'react';
import styles from './casestudy.module.css';

export const ConfioComponent = () => {
    return (
        <div className="container sm:text-left md:text-center mx-auto my-page">
            <div className={`text-left ${styles.parent}`}>
                <div className={`text-left ${styles.caseStudyLeft}`}>
                    <img alt="Confio" src="/images/case-studies/confio-logo.svg" width="147px" height="43px"></img><br></br>
                    <h3>Case Study</h3><br></br>
                    <p>
                        Confio is creating secure permissionless infrastructure and developer tools for decentralized blockchain applications. As a member of the Cosmos Network, an ecosystem dedicated to connected decentralized apps, Confio is a prominent contributor to several significant open-source projects. Contributions include:
                    </p><br></br>
                    <p><span className={`${styles.important}`}>Cosmwasm -</span> secure, interoperable, multi-chain smart contracts</p>
                    <p><span className={`${styles.important}`}>IBC -</span> a Cosmos inter-blockchain communications standard for fast and secure cross-chain digital asset exchanges</p>
                    <p><span className={`${styles.important}`}>CosmosJS -</span> a client-side JavaScript library for the Cosmos SDK.</p><br></br>
                    <p>The company's open-source contributions towards a trusted decentralized future are impressive. Equally as remarkable is their effort to drive mainstream adoption of blockchain technologies among traditional financial institutions. However, enabling financial institutions with blockchain isn't an easy feat. For instance, large financial institutions often see the dark side of cryptocurrency and require a lot of education to understand the value a blockchain can provide their business. In addition to helping companies overcome their fear of the unknown, Confio is creating solutions like Tgrade to remediate regulatory challenges and drive adoption. Tgrade is the most secure blockchain backed by Proof-of-Engagement governance, which successfully enables DeFi or decentralized finance.</p><br></br>

                    <h3>How Confio Solutions Work</h3><br></br>
                    <p>
                        CosmWasm, IBC, and CosmJS are foundational for many blockchains and decentralized applications in the Cosmos ecosystem. They provide critical smart contract, communications, and integrations components for enabling Tgrade. Tgrade further enables the next generation of multi-chain applications. Interestingly, Tgrade works based on self-sovereign groups. Meaning Tgrade customers that have an off-chain relationship with one another can create Trusted Circles. Tgrade facilitates the exchange of value between self-sovereign groups and group members.
                    </p><br></br>
                    <p>
                    Another critical area of innovation for Confio is private key management. Preventing keys from being stolen and enabling safe backups are two issues Confio is solving. The company is creating a multi-factor authentication/authorization approach allowing mobile phones to co-sign private keys. Confios innovative approach makes it very easy to build and deploy decentralized software, pushing logic higher up the stack. Once applications are up and running, adding new functionality is facilitated by deploying smart contracts without stopping any of the participating nodes.
                    </p><br></br>
                    <p>
                        At its core, the platform comprises a set of software components known as Aquamarine. Aqua is a composition language and interpreter that allows developers to compose their applications as a workflow. The system leverages the principles of π-Calculus; it expresses, coordinates, and executes programs concurrently on a single-use logical network with Marine, a WebAssembly runtime based on Wasmer.
                    </p><br></br>

                </div>
                <div className={`text-left ${styles.caseStudyRight}`}>
                    <h3>Confio in Action</h3><br></br>
                    <p>
                        CosmWasm is supporting fourteen different Cosmos projects, including Terra, Regen Network, and Crypto.com, to name a few. The company's contributions to the Cosmos Network streamlines the development of otherwise complicated decentralized infrastructure and application development. Building on top of a solid community-first approach, the company entered a strategic partnership agreement with Tendermint to fuel its DeFi product strategy with Tgrade. Tendermint leverages Tgrade to enable their vision for a token economy on public blockchains.
                    </p><br></br>
                    
                    <br></br><h3>Challenges</h3><br></br>
                    <p>
                        Blockchains enable simple, transparent, and secure transactions. However, the distributed nature of the blockchain creates several challenges for blockchain applications and infrastructure providers. For example, a smart contract is a program that must execute arbitrary logic to determine if the conditions for a value exchange were met. In a permissionless framework for decentralized applications, the system must provide security guarantees.
                    </p><br></br>
                    <ul className={`text-left ${styles.openlist}`}>
                        <li>Ensuring that a malicious or poorly written smart contract doesn't crash or block transaction processing for all blockchain users. (JIT-bombs)</li>
                        <li>Supporting determinism for smart contracts on heterogeneous infrastructure (different chipsets and platforms must run a given same smart contract in the same way)</li>
                        <li>Scaling the number of smart contract executions as the number of blocks in a blockchain increases</li>
                    </ul><br></br>
                    <p>
                        Given the complexity that Confio needed to abstract, their team placed a calculated bet on WebAssembly and Wasmer as their server-side WebAssembly runtime.
                    </p><br></br>
                </div>
                <div class={`text-left ${styles.caseStudyBottom}`}>
                    <h3>Why Wasmer</h3><br></br>
                    <p>
                        Confio's smart contracts allow blockchain developers to add new functionality to their blockchain at runtime. The engineering team at Confio quickly realized that some containerization and sandboxing technology were required to ensure the host machine's safety. WebAssembly was a natural choice since one of its core features is default sandboxing. WebAssembly applications require explicit permission and interfaces to access host machine data and resources.
                    </p><br></br>
                    <p>
                        Once the team settled on WebAssembly, the choice for creating a new server-side runtime or using an existing technology was critical. Confio evaluated many different backend solutions, and one of its early experiments included Wasmer due to its support for the Go programming language. Confio's need to support Go modules and Wasmer's support for multiple languages, including Go, made it an ideal solution. Eventually, the company decided to migrate all of its source code to Rust. During the development process, the company periodically revisited emerging and evolving backend runtimes and on Wasmer and its ecosystem.
                    </p><br></br>
                    <p>
                        Over time Confio built their solution around Wasmer to enable various layers of caching. Wasmer allowed the team to compile something once, cache it, and run it as many times as they needed. For example, token contracts used by many people compile once and enable the community to leverage the precompiled contract in memory and run it over and over again.
                    </p><br></br>


                    <p>
                        <div className={`${styles.quote}`}>"We've been so happy with the product the Wasmer team delivered that we never felt anything competing with Wasmer was convincing enough to compel us to change."<span className={`${styles.important}`}>&nbsp;&nbsp;- Simon Warta, VP of Engineering, Confio GMBH.</span></div>
                    </p><br></br>
                    <h3>About Wasmer</h3><br></br>
                    <p>
                        Headquartered in San Francisco, CA, Wasmer Inc. is behind the popular open-source WebAssembly runtime Wasmer. In addition to the Wasmer runtime, the company has made significant investments in WAPM, the WebAssembly Package Manager, and many other open-source projects in the WebAssembly ecosystem.
                    </p><br></br>
                    <p>
                        <span className={`${styles.important}`}>Our mission is to make software universally available.</span> We are committed to the open-source community and strive to contribute to developers and companies worldwide to help make Wasmer and WebAssembly a universal standard.
                    </p><br></br>
                </div>
            </div>
        </div >
    );
};