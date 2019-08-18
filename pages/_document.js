import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head inAmpMode={true}>
          <link rel="stylesheet" href="/static/fonts/gilroy/Gilroy.css" />
          <link rel="stylesheet" href="/static/fonts/zeitung/Zeitung.css" />
          <meta name="description" content="Wasmer - The Universal WebAssembly Runtime"/>
          <meta name="keywords" content="webassembly, wasm, heroku, cloudflare, docker"/>

          {/* Icons */}
          <link rel="shortcut icon" href="/static/icons/favicon-32x32.png" />
          <link rel="apple-touch-icon" sizes="57x57" href="/static/icons/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/static/icons/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/static/icons/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/icons/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/static/icons/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/static/icons/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/icons/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/icons/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192"  href="/static/icons/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/icons/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" />
          <link rel="manifest" href="/static/icons/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/static/icons/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          {/* End icons */}

          {/* <meta name="viewport" content= "width=device-width, user-scalable=yes" /> */}
        </Head>
        <head>
        <meta name="viewport" content="width=device-width"/>
        </head>
        <body>
          <div className="mobileOptimized">
            This website is not yet optimized for mobile... but will be soon!
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
