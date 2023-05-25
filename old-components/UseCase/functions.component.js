import React from 'react';
import Link from 'next/link';
import styles from './usecase.module.css';

export const FunctionsComponent = () => {
    return (
        <div className="container sm:text-left md:text-center mx-auto">
            <div className={`container mx-auto text-left md:text-center flex flex-col justify-center py-12 lg:py-24 ${styles.root}`}>
                <h1>Function-as-a-Service (Faas)</h1><br></br>
                <h3 className="text-secondary mt-3 block font-bold">Wasmer is a market leader for enabling WebAssembly on the server. It nearly eliminates all the challenges developers must deal with to fully adopt FaaS as a part of their application development strategy.</h3>
            </div>
            <div className={`${styles.showcase}`}>
                <div className={`${styles.container}`}>
                    <div className={`${styles.item}`}>
                        <img alt="Confio" src="/images/case-studies/fluence-labs-logo.svg" width="200px"></img>
                    </div>
                    <div className={`${styles.itemRight}`}>
                        <Link href="/case-studies/fluence"><a className={`${styles.action}`}>Read the Case Study</a></Link>
                    </div>
                </div>

            </div>
            <div className="container sm:text-left md:text-left mx-auto">
                <br></br><br></br><h2 className="font-bold">Challenges</h2>
                <p className="md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">FaaS applications have many advantages. However, as with most technology, there are also equally as many challenges and tradeoffs.</p><br></br><br></br>
            </div>

            <div className={`${styles.container}`}>
                <div className={`${styles.challengeItem}`}>


                    <div className={`${styles.item}`}>
                        <h3 className={`${styles.h3}`}>Cold Starts</h3>
                    </div>
                    <div className={`${styles.item}`}>
                        <p className="text-left">Functions are not always available in memory. The resulting delay in execution disqualifies FaaS from certain types of applications or forces developers to deploy workarounds that add to the cost of deployment.
                        </p>
                    </div>

                </div>
                <div className={`${styles.challengeItem}`}>


                    <div className={`${styles.item}`}>
                        <h3 className={`${styles.h3}`}>Vendor Lock-in</h3>
                    </div>
                    <div className={`${styles.item}`}>
                        <p className="text-left">Functions deployed to AWS Lambda may become difficult to push to a different cloud provider, especially if other AWS services like S3 or RDS are critical components of your application's architecture.
                        </p>
                    </div>

                </div>
                <div className={`${styles.challengeItem}`}>

                    <div className={`${styles.item}`}>
                        <h3 className={`${styles.h3}`}>Local Reproducibility</h3>
                    </div>
                    <div className={`${styles.item}`}>
                        <p className="text-left">Testing or reproducing vendor platform functionality on local infrastructure is complex and may rely on community-supported workarounds (e.g., Miniflare).</p>
                    </div>
                </div>
                <div className={`${styles.challengeItem}`}>
                    <div className={`${styles.item}`}>
                        <h3 className={`${styles.h3}`}>Hidden Costs</h3>
                    </div>
                    <div className={`${styles.item}`}>
                        <p className="text-left">FaaS platforms are fully managed services obscure to the user and often create unintended costs during peak activity if left unsupervised.</p>
                    </div>
                </div>
                <div className={`${styles.challengeItem}`}>
                    <div className={`${styles.item}`}>
                        <h3 className={`${styles.h3}`}>Security/Compliance</h3>
                    </div>
                    <div className={`${styles.item}`}>
                        <p className="text-left">Fully managed platforms may be slow to remediate security issues or may not fully adhere to regulations specific to your business needs (e.g., GDPR, SOX, HIPPA, etc.)</p>
                    </div>
                </div>
            </div>
            <div className="container sm:text-left md:text-left mx-auto"><br></br><br></br><h2 className="font-bold">Wasmer Benefits</h2><br></br><br></br></div>
            <div className={`${styles.container}`}>
                <div className={`${styles.benefitItem}`}>
                    <h3>Fast Startup Times</h3>
                    <p className="text-left">Wasmer enables precompilation of Wasm modules for ultra-fast and responsive startup times.</p>
                </div>
                <div className={`${styles.benefitItem}`}>
                    <h3>No Vendor Lock-in</h3>
                    <p className="text-left">Wasm modules get compiled to universal binaries that can be adapted to run on any provider's infrastructure quickly.</p>
                </div>
                <div className={`${styles.benefitItem}`}>
                    <h3>Local Reproducibility</h3>
                    <p className="text-left">The Wasmer Runtime makes it possible to run and test all of your service components locally.</p>
                </div>
                <div className={`${styles.benefitItem}`}>
                    <h3>Legacy Support</h3>
                    <p className="text-left">Compile legacy server-side code to WebAssembly and run it as a function.</p>
                </div>
                <div className={`${styles.benefitItem}`}>
                    <h3>Development Efficiency</h3>
                    <p className="text-left">Eliminate extraneous development costs and enable developers to work with languages they know and love.</p>
                </div>
            </div>
            <div><p className="md:max-w-md max-w-lg xl:max-w-2xl md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">Wasmer is an open-source runtime for executing WebAssembly on the Server.</p></div>
        </div>
    );
};