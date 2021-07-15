import React from 'react';
import styles from './usecase.module.css';

export const BlockchainComponent = () => {
    return (
        <div className="container sm:text-left md:text-center mx-auto">
            <div className={`container mx-auto text-left md:text-center flex flex-col justify-center py-12 lg:py-24 ${styles.root}`}>
                <h1>Blockchain</h1><br></br>
                <h3 className="text-secondary mt-3 block font-bold">WebAssembly is the dominant format for executing smart contracts, and Wasmer is the preferred WebAssembly runtime for blockchain and cryptocurrency providers.</h3>
            </div>
            <div className={`${styles.showcase}`}>
                <div className={`${styles.container}`}>
                    <div className={`${styles.item}`}>
                        <img alt="Confio" src="/images/case-studies/confio-logo.svg" width="200px"></img>
                    </div>
                    <div className={`${styles.itemRight}`}>
                    <a className={`${styles.action}`} href="/case-studies/confio" target="_blank">Read the Case Study</a>
                    </div>
                </div>

            </div>
            <div className="container sm:text-left md:text-left mx-auto">
            <br></br><br></br><h2 className="font-bold">Challenges</h2>
                <p className="md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">Blockchains enable simple, transparent, and secure transactions. However, the distributed nature of the blockchain creates several challenges for blockchain applications and infrastructure providers.</p><br></br><br></br>
            </div>

            <div className={`${styles.container}`}>
                <div className={`${styles.challengeItem}`}>
                    <h3>JIT-bombs</h3>
                    <p className="text-left">Ensuring that a malicious or poorly written smart contract doesn't crash or block transaction processing for all blockchain users. (JIT-bombs)</p>
                </div>
                <div className={`${styles.challengeItem}`}>
                    <h3>Determinism</h3>
                    <p className="text-left">Supporting determinism for smart contracts on heterogeneous infrastructure. (different chipsets and platforms must run a given same smart contract in the same way)</p>
                </div>
                <div className={`${styles.challengeItem}`}>
                    <h3>Scale</h3>
                    <p className="text-left">Scaling the number of smart contract executions as the number of blocks in a blockchain increases.</p>
                </div>                
            </div>
            <div className="container sm:text-left md:text-left mx-auto"><br></br><br></br><h2 className="font-bold">Wasmer Benefits</h2><br></br><br></br></div>
            <div className={`${styles.container}`}>
            <div className={`${styles.benefitItem}`}>
                    <h3>No JIT-bombs</h3>
                    <p className="text-left">JIT-bombs slow down or block smart contract processes due to malicious or poorly written code. Wasmer's Singlepass compiler helps eliminate JIT-bombs, enabling blockchain providers with a high-quality-of-service infrastructure for their applications.</p>
                </div>
                <div className={`${styles.benefitItem}`}>
                    <h3>Heterogeneous Infrastructure</h3>
                    <p className="text-left">Wasmer's blockchain infrastructure ensures that the outcome of each smart contract execution returns the same result regardless of the underlying infrastructure. (e.g., x86_64, ARM, etc.)</p>
                </div>
                <div className={`${styles.benefitItem}`}>
                    <h3>Performance</h3>
                    <p className="text-left">The Wasmer compiler engines and runtime ensure high-performance compilation and code execution without any miscompiles.</p>
                </div>
            </div>
            <div><p className="md:max-w-md max-w-lg xl:max-w-2xl md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">Wasmer is an open-source runtime for executing WebAssembly on the Server.</p></div>
        </div>
    );
};