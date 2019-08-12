import React from "react";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/footer";
import copy from "copy-to-clipboard";

import goIcon from "../images/languages/go.svg";
import rustIcon from "../images/languages/rust.svg";
import pythonIcon from "../images/languages/python.svg";
import rubyIcon from "../images/languages/ruby.svg";
import phpIcon from "../images/languages/php.svg";
import cIcon from "../images/languages/c.svg";
import cppIcon from "../images/languages/cpp.svg";
import cSharpIcon from "../images/languages/c-sharp.svg";

import binaryIcon from "../images/binary.svg";
import featherIcon from "../images/feather.svg";
import secureIcon from "../images/secure.svg";

import installVideo from "../images/install.svg";

import css from "./index.css";
import grid from "../components/grid.css";

const embeddedUses = [
  {
    name: "Go",
    image: goIcon,
    url: "https://github.com/wasmerio/go-ext-wasm"
  },
  {
    name: "Rust",
    image: rustIcon,
    url: "https://github.com/wasmerio/go-ext-wasm"
  },
  {
    name: "Python",
    image: pythonIcon,
    url: "https://github.com/wasmerio/python-ext-wasm"
  },
  {
    name: "Ruby",
    image: rubyIcon,
    url: "https://github.com/wasmerio/ruby-ext-wasm"
  },
  {
    name: "PHP",
    image: phpIcon,
    url: "https://github.com/wasmerio/php-ext-wasm"
  },
  {
    name: "C",
    image: cIcon,
    url: "https://github.com/wasmerio/php-ext-wasm"
  },
  {
    name: "C++",
    image: cppIcon,
    url: "https://github.com/wasmerio/php-ext-wasm"
  },
  {
    name: "C#",
    image: cSharpIcon,
    url: "https://github.com/wasmerio/php-ext-wasm"
  }
];

class Snippet extends React.Component {
  state = {
    copied: false
  };
  static installCommand = "curl https://get.wasmer.io -sSfL | sh";
  onClick(e) {
    this.setState({ copied: true });
    copy(Snippet.installCommand);
  }
  onMouseOut(e) {
    if (this.state.copied) {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 200);
    }
  }
  render() {
    const copied = this.state.copied;
    return (
      <div
        className={`${css.baseSnippet} ${this.props.className || ""}`}
        onClick={this.onClick.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
      >
        <pre>{Snippet.installCommand}</pre>
        <span className={`${css.copy} ${copied ? css.copied : ""}`}>
          {copied ? "Copied" : "Copy"}
        </span>
      </div>
    );
  }
}
const Home = () => (
  <div>
    <Head>
      <title>Wasmer</title>
    </Head>
    <Nav />

    <div className={css.hero}>
      <h1 className={css.title}>
        <strong>Run any code on any client.</strong>
        With WebAssembly and Wasmer.
      </h1>
    </div>
    <div className={grid.gridWrap1}>
      <div className={grid.grid} />
      <div>
        <Snippet className={css.snippet} />
      </div>
      <div className={css.heroEmbed}>
        or just embed it into your existing application:
        <ul>
          {embeddedUses.map(embed => {
            return (
              <a
                href={embed.url}
                title={`Wasmer ${embed.name} WebAssembly library`}
              >
                <img src={embed.image} alt={`${embed.name} icon`} />
              </a>
            );
          })}
        </ul>
      </div>
      <div className={css.explainer}>
        <div className={css.animation} />
        <h2>
          <span className={css.explainerStep1}>
            Use the tools you know and the languages you love.
          </span>{" "}
          <span className={css.explainerStep2}>
            Compile everything to WebAssembly.
          </span>{" "}
          <span className={css.explainerStep3}>
            Run it on any OS or embed it into other languages.
          </span>
        </h2>
      </div>
    </div>
    <div className={css.useCases}>
      <ul>
        <li>
          <img src={binaryIcon} />
          <div>Create binaries that work on any platform</div>
          <a href="">Learn more</a>
        </li>
        <li>
          <img src={featherIcon} />
          <div>Run lightweight packages on the Edge</div>
          <a href="">Learn more</a>
        </li>
        <li>
          <img src={secureIcon} />
          <div>Execute untrusted code safely</div>
          <a href="">Learn more</a>
        </li>
      </ul>
    </div>

    <div className={grid.gridWrap2}>
      <div className={grid.grid} />
      <div className={css.container}>
        <div className={css.install}>
          <h3>Try it now!</h3>
          <p>
            Install Wasmer by copy-pasting a single command.
            <br />
            It’s that easy.{" "}
          </p>
          <Snippet className={css.installSnippet} />
          <div className={css.installWindows}>
            Wasmer is also available on Windows. <a href="">Download it here</a>
          </div>
        </div>
        <div className={css.installVideo}>
          {/* echo $LINES $COLUMNS
          16 44 */}
          <img src={installVideo} />
        </div>

        <div className={css.embed}>
          <p>
            ...or embed Wasmer into the language of your choice and run
            WebAssembly everywhere.
          </p>
          <div className={css.embedLanguages}>
            {embeddedUses.map(embed => {
              return (
                <a
                  href={embed.url}
                  title={`Wasmer ${embed.name} WebAssembly library`}
                >
                  <span>{embed.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    <div className={css.wapm}>
      <div className={css.container}>
        <h1>
          Pre-installed:
          <br />
          <strong>WAPM</strong>, the WebAssembly Package Manager
        </h1>
        <pre>wapm install optipng</pre>
        <a className={css.seeAll} href="https://wapm.io/">
          See all packages on wapm.io
        </a>
      </div>
    </div>

    <div className={css.media}>
      <blockquote>
        <p>“This programming tool makes it easier for apps to work anywhere”</p>
      </blockquote>
    </div>

    <div className={grid.gridSeparator} />

    <div className={css.callToAction}>
      <h4>
        <strong>Curious?</strong> Get in touch or check out our forum.
      </h4>
      <a className={css.button} href="https://spectrum.chat/wasmer">
        Go to Forum
      </a>
      <a className={css.primaryButton} href="mailto:sales@wasmer.io">
        Contact Sales
      </a>
    </div>

    <div className={css.trustedBy} />

    <Footer />
  </div>
);

export default Home;
