import React from 'react';
import styles from './casestudy.module.css';

export const HotgComponent = () => {
    return (
        <div className="container sm:text-left md:text-center mx-auto my-page">
            <div className={`text-left ${styles.parent}`}>
                <div className={`text-left ${styles.caseStudyLeft}`}>
                    <a href="https://hotg.dev/" target="_blank"><img alt="hotg.dev" src="/images/case-studies/hotg-logo.png" width="147px" height="43px"></img></a><br></br>
                    <h3>Case Study</h3><br></br>
                    <p>
                    An explosion of raw data from semi-connected, highly distributed IoT devices and microcontrollers require an entirely new machine learning (ML) approach. <a className={`${styles.eLink}`} href="https://hotg.dev/" target="_blank">HOT-G</a> brings machine-learning operations to the Edge with Tiny ML. It enables developers and data scientists to orchestrate ML applications across mesh networked edge devices, wrangle complex data, and train ML models on resource-constrained devices without compromising privacy. The company is on a mission to accelerate the future of hardware and Tiny ML through an open-source development model and community.
                    </p><br></br>

                    <h3>How HOT-G Works</h3><br></br>
                    <p>
                    The HOT-G platform comprises four powerful tools, including Rune, Anvil, Hammer, and Saga. <span className={`${styles.important}`}>Rune </span>enables Tiny ML applications to execute in ultra-portable containers and works in tandem with <span className={`${styles.important}`}>Anvil</span>, a configuration management system that targets various devices or nodes. Within the Tiny ML context, devices or nodes include anything from small Arduinos, iOS or Android devices, and browsers. Rune containers must execute predictably across all target endpoints. <span className={`${styles.important}`}>Hammer,</span> the deployment engine, runs and manages applications on physical devices and relies on <span className={`${styles.important}`}>Saga</span> to handle scale, resiliency, observability, and data management.
                    </p><br></br>
                    <h3>HOT-G in Action</h3><br></br>
                    <p>
                    HOT-G is partnering with <span className={`${styles.important}`}><a href="https://frontm.com/platform/" target="_blank">FrontM</a></span> a London based Tech start focused on helping businesses that operate in low level bandwidth environments to connect their people, customers, process and data via a programmable platform approach to service consumption. With a specific focus on the maritime industry, as shipping operators, government agencies and environmentalists are heavily reliant upon various data sets collected onboard using various sensors that may not be able to leverage Machine Learning (ML) on the cloud. Key constraints include limited or no network connectivity whilst at sea, limiting data storage, CPU, and memory resources. The HOT-G team is building a solution that deploys Rune-based Tiny ML applications on FrontM’s platform for their customers at sea. These ML applications are able to operate without needing access to the cloud. With this approach once network connection is within range, tagged data is offloaded to train new models. Model updates can then be published and shared across the fleet.
                    </p><br></br>
                </div>
                <div className={`text-left ${styles.caseStudyRight}`}>
                    <br></br><h3>Challenges</h3><br></br>
                    <p>
                    Edge computing, in general, compounds application orchestration challenges compared to traditional data center or cloud computing environments. In addition to extreme latency, heterogeneous infrastructure, and security concerns, HOT-G must also handle specialized ML requirements.
                    </p><br></br>
                    <ul className={`text-left ${styles.openlist}`}>
                        <li>The ability to securely provide access to local or highly specialized hardware (e.g., sensors, TPUs, FPGAs, etc.)</li>
                        <li>Portability of Tiny ML applications that run predictably across many types of infrastructure</li>
                        <li>Local reproducibility of Tiny ML applications to verify resource footprint to predetermine execution probability on resource-limited devices.</li>
                    </ul><br></br>
                    <p>
                    HOT-G required a solution for creating a container with universal execution, out-of-the-box sandboxing and security, and the ability to interface with low-level hardware. Their team tried several solutions like Emscripten and LLVM. However, they found the tight coupling between Emscripten and browsers a non-starter to their edge deployment needs. Ultimately, the team at HOT-G selected the Wasmer runtime for edge execution for WebAssembly.
                    </p><br></br>
                </div>
                <div class={`text-left ${styles.caseStudyBottom}`}>
                    <h3>Why Wasmer</h3><br></br>
                    <p>
                    HOT-G carefully considered different interpreters and runtimes as options for running server-side WebAssembly. Interpreters presented a larger payload for smaller IoT devices, and the team found them challenging to work with and extend. Wasmer provided HOT-G with a lightweight runtime and multiple compilation options. Tooling to precompile WebAssembly to architecture-specific formats enables HOT-G to write once and deploy anywhere without any runtime overhead. Additional applications like WAPM, Wasmer's WebAssembly Package manager help HOT-G realize its open-source community-driven mission for Tiny ML.
                    </p><br></br>
                    <p>
                        <div className={`${styles.quote}`}>"A really nice feature of Wasmer is that the SDK/API is very well designed and easy to use."<span className={`${styles.important}`}>&nbsp;&nbsp;- Kartik Thakore, Co-Founder at HOT-G.</span></div>
                    </p><br></br>
                <h3>About Wasmer</h3><br></br>
                <p>
                    Headquartered in San Francisco, CA, Wasmer Inc. is behind the popular open-source WebAssembly runtime Wasmer. In addition to the Wasmer runtime, the company has made significant investments in WAPM, the WebAssembly Package Manager, and many other open-source projects in the WebAssembly ecosystem.
                </p><br></br>
                <p>
                <span className={`${styles.important}`}>Our mission is to make software universally available.</span> We are committed to the open-source community and strive to contribute to developers and companies worldwide to help make Wasmer and WebAssembly a universal standard.
                </p><br></br>
                <h3>About HOT-G</h3>
                <p>
                Based out of Palo Alto, CA, HOT-G Inc. is building the distributed infrastructure to pave the way for AI enabled edge applications. HOT-G is building the tools of orchestration for AI on the edge including open source container technology called Rune. 
                </p>
                <br></br>
                <p>Our mission is to decouple intelligence by making AI run across a spectrum of edge devices and providing best in class orchestration and infrastructure to do so.</p>
                <br></br>
                <h3>About FrontM</h3>
                <p> FrontM is a UK headquartered technology startup with the team spread between London, SFO and Bangalore. FrontM provides a programmable software platform for low bandwidth environments,  bringing remote customers, workforces & Edge AI automation together under one roof.
                </p><br></br>
                <p>For more information, visit</p>
                <p> 
                    <a href="http://www.frontm.com" target="_blank">http://www.frontm.com</a></p>
            </div>
        </div>
        </div >
    );
};