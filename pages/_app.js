import Head from 'next/head';
import React from 'react';
import 'intersection-observer/intersection-observer';
import { FooterComponent, NavComponent } from '../components';
import '../assets/fonts/Gilroy/Gilroy.css';
import '../assets/fonts/Zeitung/Zeitung.css';
import '../assets/styles/index.css';
import "prismjs/prism.js";
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-jsx';
import "prismjs/components/prism-c";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-shell-session";

import "prismjs/themes/prism-tomorrow.css";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Wasmer - The Universal WebAssembly Runtime</title>
        <meta
          name="title"
          content="Wasmer - The Universal WebAssembly Runtime"
          key="title"
        />
        <meta
          name="description"
          content="Wasmer - The Universal WebAssembly Runtime"
          key="description"
        />
        <meta
          name="keywords"
          content="webassembly, wasm, heroku, cloudflare, docker"
          key="keywords"
        />
        <meta
          name="twitter:image"
          content="https://wasmer.io/images/og-image.png"
        />
        <meta
          property="og:image"
          content="https://wasmer.io/images/og-image.png"
        />
        <link rel="shortcut icon" href="/images/icons/favicon-32x32.png" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/images/icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/images/icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/images/icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/icons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/icons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/images/icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/icons/favicon-16x16.png"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/images/icons/ms-icon-144x144.png"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '760809464311547'); // Insert your pixel ID here.
  fbq('track', 'PageView');`,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-129663180-1"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-129663180-1');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.intercomSettings = {
  app_id: "mfr59yjl"
};
`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/mfr59yjl';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`,
          }}
        />
      </Head>
      <NavComponent />
      <Component {...pageProps} />
      <FooterComponent />
    </>
  );
}

export default App;
