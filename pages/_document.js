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
