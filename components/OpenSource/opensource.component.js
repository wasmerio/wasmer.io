import React from 'react';
import styles from './opensource.module.css';

export const OpenSourceComponent = () => {
    return (
        <div className="container sm:text-left md:text-center mx-auto my-page">

            <div className={`container mx-auto text-left md:text-center flex flex-col justify-center py-12 lg:py-24 ${styles.root}`}>
                <h1>Wasmer Open Source Program</h1>
                <h2 className="text-secondary mt-3 block font-bold"><span>Run any code on any client <br className="hidden md:inline" /> with WebAssembly and Wasmer.</span></h2>
                <p className="md:max-w-md max-w-lg xl:max-w-2xl md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">Wasmer is an open-source runtime for executing WebAssembly on the Server.</p>
            </div>

            <div className={`container mx-auto text-left md:text-left flex flex-col justify-center py-12 lg:py-24 ${styles.root}`}>
                <h2 className="font-bold">Program Objectives</h2>
                <p className="md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">Wasmer's goal is to create an open and transparent collaboration between our professional, dedicated staff members and our community. All proceeds will help fund the following:</p>
                <br className="hidden md:inline" />

                <ul className={`font-bold ${styles.openlist}`}>
                    <li>Dedicated professional staff for ongoing open-source development</li>
                    <li>Open-source tools like the Wasmer Runtime, language bindings (APIs), and compilers</li>
                    <li>Feature enhancements and performance improvements</li>
                    <li>Continuous vulnerability testing, disclosure, and remediation</li>
                    <li>Community support, growth, and education (e.g., documentation, blogs, videos)</li>
                </ul>

            </div>

            <div className={`container mx-auto text-left md:text-left flex flex-col justify-center py-12 lg:py-24 ${styles.root}`}>
                <h2 className="font-bold mb-4">Sponsorship Tiers</h2>

                <span className={`${styles.openanchor}`}>
                    <span>
                        <a className="text-secondary font-bold" href="https://opencollective.com/wasmerio/contribute/platinum-28298">Platinum</a>
                    </span>
                    <span className="md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">
                        - Ideal for enterprises that require immediate prioritization of mission-critical Open Source features for the Wasmer WebAssembly Runtime.
                </span>
                </span>
                <br className="hidden md:inline" />
                <span className={`${styles.openanchor}`}>
                    <span>
                        <a className="text-secondary font-bold" href="https://opencollective.com/wasmerio/contribute/gold-28446">Gold</a>
                    </span>
                    <span className="md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">
                        - Ideal for enterprises and companies that rely on WebAssembly, Wasmer, and other Open Source toolchains as a part of their products and services.
                </span>
                </span>
                <br className="hidden md:inline" />
                <span className={`${styles.openanchor}`}>
                    <span>
                        <a className="text-secondary font-bold" href="https://opencollective.com/wasmerio/contribute/silver-28445">Silver</a>
                    </span>
                    <span className="md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">
                        - Ideal for startups that use WebAssembly as a part of their product stack and believe in supporting Wasmer in building and maintaining an Open Source ecosystem and infrastructure tools.
                </span>
                </span>
                <br className="hidden md:inline" />
                <span className={`${styles.openanchor}`}>
                    <span>
                        <a className="text-secondary font-bold" href="https://opencollective.com/wasmerio/contribute/bronze-28444">Bronze</a>
                    </span>
                    <span className="md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">
                        - Ideal for developers and WebAssembly enthusiasts building apps and libraries with Wasmer.
                    </span>
                </span>
            </div>
            <div className={`container mx-auto text-left md:text-left flex flex-col justify-center py-12 lg:py-24 ${styles.root}`}>
                <h2 className="font-bold mb-4">Sponsorship Benefits</h2>

                <table className={`${styles.opentable}`}>
                    <thead className={`${styles.opentablehead} text-secondary font-bold`}>
                        <th>Benefit</th>
                        <th>Platinum</th>
                        <th>Gold</th>
                        <th>Silver</th>
                        <th>Bronze</th>
                    </thead>
                    <tr>
                        <td>Prioritized feature requests, bug fixes, and code contributions</td>
                        <td className="md:text-center">&#10004;</td>
                        <td className="md:text-center">&nbsp;</td>
                        <td className="md:text-center">&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Joint open source roadmap planning</td>
                        <td className="md:text-center">&#10004;</td>
                        <td className="md:text-center">&#10004;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Beta access to features</td>
                        <td className="md:text-center">&#10004;</td>
                        <td className="md:text-center">&#10004;</td>
                        <td className="md:text-center">&#10004;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Dedicated Slack Channel</td>
                        <td className="md:text-center">&#10004;</td>
                        <td className="md:text-center">&#10004;</td>
                        <td className="md:text-center">&#10004;</td>
                        <td className="md:text-center">&#10004;</td>
                    </tr>
                    <tr>
                        <td>Logo plus link on the Wasmer Sponsors webpage</td>
                        <td className="md:text-center">&#10004;</td>
                        <td className="md:text-center">&#10004;</td>
                        <td className="md:text-center">&#10004;</td>
                        <td className="md:text-center">&#10004;</td>
                    </tr>
                    <tr>
                        <td>Wasmer swag</td>
                        <td className="md:text-center">&#10004;</td>
                        <td className="md:text-center">&#10004;</td>
                        <td className="md:text-center">&#10004;</td>
                        <td className="md:text-center">&#10004;</td>
                    </tr>
                </table>
            </div>

            <div className={`container mx-auto text-left md:text-left flex flex-col justify-center py-12 lg:py-24 ${styles.root}`}>
                <h2 className="font-bold mb-4">Use of Funds</h2>

                <p className="md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">Wasmer aims to provide a higher quality of service through our open-source sponsorship model with resource pooling.</p>
                <br className="hidden md:inline" />
                <h3 className="font-bold mb-4">Funding Allocations</h3>
                <ul className={`font-bold ${styles.openlist}`}>
                    <li>70% of sponsorship resources are dedicated to core development</li>
                    <li>20% of resources are allocated to security and vulnerability testing and remediation</li>
                    <li>10% of resources are used for community development and education.</li>
                </ul>

                <p className="md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">Engineering and support resources - Wasmer will hire professional engineering resources to build, maintain, and support new and existing open-source products.</p>
                <br className="hidden md:inline" />
                <p className={`${styles.openanchor}`}><span className={`${styles.openstrong}`}>Note:</span> Wasmer provides access to dedicated resources to ensure timely prioritization and implementation of mission-critical features for our Platinum Sponsors.</p>
            </div>

            <div className={`container mx-auto text-left md:text-left flex flex-col justify-center py-12 lg:py-24 ${styles.root}`}>
                <h2 className="font-bold mb-4">FAQs</h2>

                <p className={`${styles.openstrong} ${styles.openanchor}`}>How does my organization or I become a sponsor?</p>
                
                    <br className="hidden md:inline" />
                
                <p className="md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">Wasmer accepts sponsorships through Open Collective. Use the following link to determine what sponsorship tier works best for you.</p><a className="text-secondary font-bold" href="https://opencollective.com/wasmerio">https://opencollective.com/wasmerio</a>
                
                    <br className="hidden md:inline" />
                
                <p className={`${styles.openstrong} ${styles.openanchor}`}>Do sponsors get an SLA for support?</p>
                
                    <br className="hidden md:inline" />
                
                <p className="opacity-50 mt-4 lg:mt-6 xl:mt-12 text">Wasmer's open-source program provides two types of support SLAs.</p>
                
                    <br className="hidden md:inline" />
                
                <ul className={`opacity-50 text ${styles.openlist}`}>
                    <li>Platinum sponsors work directly with dedicated resources to prioritize features and gain alignment on implementation timelines.</li>
                    <li>Platinum, Gold, and Silver tier sponsors use a dedicated Slack channel for support between 9:00 AM and 9:00 PM EDT/EST. Resources will respond within 4-hours of the initial support request.</li>
                    <li>Bronze sponsors can join the Wasmer community channel for support, and Wasmer resources will respond as soon as possible.</li>
                </ul>
                
                    <br className="hidden md:inline" />
                
                <p className={`${styles.openstrong} ${styles.openanchor}`}>Are there any guarantees regarding prioritizing feature requests and bug fixes?</p>
                
                <br className="hidden md:inline" />
                
                <p className="opacity-50 mt-4 lg:mt-6 xl:mt-12 text">All new development and bug remediation are open-source and available to the community. However, platinum sponsors may prioritize specific bug fixes or new features and utilize resources allocated to their sponsorship to expedite implementation. In general, all feature requests and bug fixes are tracked using GitHub milestones. Prioritization for new features and bug fixes take place in public on GitHub and through joint planning sessions. Joint planning sessions are open for platinum and gold sponsors.</p>
                
                <br className="hidden md:inline" />
                
                <p className={`${styles.openstrong} ${styles.openanchor}`}>What is the number of employees allocated to each tier?</p>
                
                <br className="hidden md:inline" />
                
                <p className="opacity-50 mt-4 lg:mt-6 xl:mt-12 text">In general, Wasmer employees dedicated to open-source development are pooled together to support all sponsors across all tiers. However, platinum-level sponsors can allocate developer resources to work on items they prioritized commensurate with their level of funding and proportionate to their share of developer resources.</p>
                
                <br className="hidden md:inline" />
                
                <p className={`${styles.openstrong} ${styles.openanchor}`}>What does beta access mean in the context of open-source?</p>
                
                <br className="hidden md:inline" />
                
                <p className="opacity-50 mt-4 lg:mt-6 xl:mt-12 text">Advance access to features comes in the following forms:</p>
                
                <br className="hidden md:inline" />
                
                <ul className={`opacity-50 text ${styles.openlist}`}>
                    <li>Access and input to design documents for new features or when we refactor code</li>
                    <li>Performance profiling tools that we will create for sponsors</li>
                    <li>A testing playground and hosted access to new features that would prove cumbersome for customers to deploy and manage on their own (e.g., hosted environments for future release testing to ensure a smooth production change control process)</li>
                </ul>
                
                <br className="hidden md:inline" />
                <p className="opacity-50 mt-4 lg:mt-6 xl:mt-12 text"><span className={`${styles.openstrong}`}>Note:</span> In some instances, tools we create for our sponsors may be more beneficial to our sponsors' customers.</p>
            </div>
        </div>
    );
};
