import React from 'react';
import Link from 'next/link';
import styles from './usecase.module.css';

export const AiComponent = () => {
    return (
        <div className="container sm:text-left md:text-center mx-auto">
            <div className={`container mx-auto text-left md:text-center flex flex-col justify-center py-12 lg:py-24 ${styles.root}`}>
                <h1>Machine Learning and AI</h1><br></br>
                <h3 className="text-secondary mt-3 block font-bold">Wasmer is a market leader for enabling WebAssembly on the server. It nearly eliminates all the challenges developers must deal with for deploying machine learning applications in and outside of data center environments.</h3>
            </div>
            <div className={`${styles.showcase}`}>
                <div className={`${styles.container}`}>
                    <div className={`${styles.item}`}>
                        <img alt="Confio" src="/images/case-studies/hotg-logo.png" width="200px"></img>
                    </div>
                    <div className={`${styles.itemRight}`}>
                    <Link href="/case-studies/hotg"><a className={`${styles.action}`}>Read the Case Study</a></Link>
                    </div>
                </div>

            </div>
            <div className="container sm:text-left md:text-left mx-auto">
                <br></br><br></br><h2 className="font-bold">Challenges</h2>
                <p className="md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">Wasmer is a market leader for enabling WebAssembly on the server. It nearly eliminates all the challenges developers must deal with for deploying machine learning applications in and outside of data center environments.</p><br></br><br></br>
            </div>

            <div className={`${styles.container}`}>
                <div className={`${styles.challengeItem}`}>
                    <div className={`${styles.item}`}>
                        <h3 className={`${styles.h3}`}>Model Portability </h3>
                    </div>
                    <div className={`${styles.item}`}>
                        <p className="text-left">It is difficult and expensive to collect data or deploy models to heterogeneous infrastructure and devices.</p>
                    </div>
                </div>
                <div className={`${styles.challengeItem}`}>
                    <div className={`${styles.item}`}>
                        <h3 className={`${styles.h3}`}>Data Explosion</h3>
                    </div>
                    <div className={`${styles.item}`}>
                        <p className="text-left">More devices mean more data must be collected, processed, and incorporated into ML/AI models.</p>
                    </div>
                </div>
                <div className={`${styles.challengeItem}`}>
                    <div className={`${styles.item}`}>
                        <h3 className={`${styles.h3}`}>Limited Connectivity</h3>
                    </div>
                    <div className={`${styles.item}`}>
                        <p className="text-left">High-speed networks are not always available, or devices may be offline for extended periods.</p>
                    </div>
                </div>
                <div className={`${styles.challengeItem}`}>
                    <div className={`${styles.item}`}>
                        <h3 className={`${styles.h3}`}>Limited Power</h3>
                    </div>
                    <div className={`${styles.item}`}>
                        <p className="text-left">Training ML/AI models require significant infrastructure resources and power that may not always be available outside data centers.</p>
                    </div>
                </div>
                <div className={`${styles.challengeItem}`}>
                    <div className={`${styles.item}`}>
                        <h3 className={`${styles.h3}`}>Security</h3>
                    </div>
                    <div className={`${styles.item}`}>
                        <p className="text-left">ML/AI applications on IoT devices are especially susceptible to common security risks like data poisoning or transfer learning attacks where existing trained models are hijacked for malicious intent.</p>
                    </div>
                </div>

            </div>
            <div className="container sm:text-left md:text-left mx-auto"><br></br><br></br><h2 className="font-bold">Wasmer Benefits</h2><br></br><br></br></div>
            <div className={`${styles.container}`}>
                <div className={`${styles.benefitItem}`}>
                    <h3>Ultra-Portability</h3>
                    <p className="text-left">WebAssembly enables universal binaries, and the Wasmer Runtime ensures ML/AI Wasm apps run on any device.</p>
                </div>
                <div className={`${styles.benefitItem}`}>
                    <h3>Small Footprint</h3>
                    <p className="text-left">Wasmer's headless and architecture-specific compilation options scale down to the more resource-constrained devices.</p>
                </div>
                <div className={`${styles.benefitItem}`}>
                    <h3>Performance</h3>
                    <p className="text-left">Wasmer provides multiple engines and compilers to help developers optimize their deployments for their specific performance requirements.</p>
                </div>
                <div className={`${styles.benefitItem}`}>
                    <h3>Security</h3>
                    <p className="text-left">Isolate server-side WebAssembly from host devices explicitly enabling access only to required components or sensor data.</p>
                </div>
            </div>
            <div><p className="md:max-w-md max-w-lg xl:max-w-2xl md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">Wasmer is an open-source runtime for executing WebAssembly on the Server.</p></div>
        </div>
    );
};