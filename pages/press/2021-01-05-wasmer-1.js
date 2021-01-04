import React from 'react';
import Head from 'next/head';

import {
    ContactComponent,
    LinkComponent,
} from '../../components';
import {
    PressComponent,
} from '../../components/Press';

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>Wasmer Announces the Release of Wasmer 1.0, its Industry-leading Open Source WebAssembly Runtime</title>
                <meta name="title" content="Wasmer Announces the Release of Wasmer 1.0, its Industry-leading Open Source WebAssembly Runtime" key="title" />
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/@tailwindcss/typography@0.2.x/dist/typography.min.css"
                />

            </Head>
            <PressComponent title="Wasmer Announces the Release of Wasmer 1.0, its Industry-leading Open Source WebAssembly Runtime">
                <p>SAN FRANCISCO – January 5th, 2020 – Wasmer Inc., a leader in next-generation application development and deployment infrastructure for WebAssembly (Wasm), announces the general availability of Wasmer 1.0, its open-source Wasm runtime.</p>

                <figure><blockquote>We believe that WebAssembly is a crucial component for the future of software execution and containerization for both client and server-side applications.</blockquote>
                    <figcaption>– Syrus Akbary <cite>Founder & CEO, Wasmer Inc.</cite></figcaption>
                </figure>


                <p>Packed full of new features and performance optimizations, Wasmer 1.0 enables the developer community to build and deploy production-ready WebAssembly applications everywhere. </p>

                <p>Some key features include:</p>
                <ul>
                    <li>Up to a 9x improvement in compilation times</li>
                    <li>Pluggable infrastructure to support multiple compiler configurations</li>
                    <li>Native object engine to precompile shared object files</li>
                    <li>Headless Wasmer deployments to support Edge and IoT use-cases</li>
                    <li>Cross-compilation for targeting multiple deployment architectures</li>
                    <li>Improved API user experience and support for the standard Wasm-C-API</li>
                    <li>New and improved error handling and reporting infrastructure.</li>
                </ul>

                <figure><blockquote>We choose Wasmer because it was really easy to integrate, hack, adapt to our usages and needs, both as a technology and as a project, with great documentation and team.</blockquote>
                    <figcaption>– Quentin Adam <cite>CEO, CleverCloud</cite></figcaption>
                </figure>

                <p>
                    Wasmer 1.0 is already being used and tested by companies and individual developers across the globe. If you would like to try Wasmer, you can install the CLI from wasmer.io to run Wasmer standalone or embed Wasmer in your favorite programming languages.
                </p>

                <h2>About Wasmer</h2>
                <p>Headquartered in San Francisco, CA, Wasmer Inc. is the company behind the popular open-source WebAssembly runtime Wasmer. In addition to the Wasmer runtime, the company has made significant investments in <a href="https://wapm.io" target="_blank">WAPM</a>, a WebAssembly package manager, and many other open-source projects in the WebAssembly ecosystem.</p>

                <p>Our mission is to make software universally available. We are committed to the open-source community and strive to contribute to developers and companies worldwide to help make Wasmer and WebAssembly a universal standard.</p>
            </PressComponent>
            <ContactComponent
                title={
                    <>
                        <strong className="block">Ready to give it a try?</strong>{' '}
            Stay in touch and get involved.
          </>
                }
            >
                <LinkComponent
                    isButton
                    secondary
                    linkText="Go to Github"
                    href="https://github.com/wasmerio/wasmer"
                    target="_blank"
                />
                <LinkComponent
                    isButton
                    linkText="Go to Wasmer 1.0 blog post"
                    href="https://medium.com/wasmer/wasmer-1-0-3f86ca18c043"
                    target="_blank"
                />
            </ContactComponent>
        </>
    );
}
