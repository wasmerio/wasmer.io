import React from "react";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/footer";
import copy from "copy-to-clipboard";
import handleViewport from "react-in-viewport";
import classnames from "classnames";

import css from "./index.css";
import grid from "../components/grid.css";

// import goIcon from "../images/languages/go.svg";
// import rustIcon from "../images/languages/rust.svg";
// import pythonIcon from "../images/languages/python.svg";
// import rubyIcon from "../images/languages/ruby.svg";
// import phpIcon from "../images/languages/php.svg";
// import cIcon from "../images/languages/c.svg";
// import cppIcon from "../images/languages/cpp.svg";
// import cSharpIcon from "../images/languages/c-sharp.svg";

// Languages
import goIcon from "../images/languages/go-logo.svg";
import rustIcon from "../images/languages/rust-logo.svg";
import pythonIcon from "../images/languages/python-logo.svg";
import rubyIcon from "../images/languages/ruby-logo.svg";
import phpIcon from "../images/languages/php-logo.svg";
import cIcon from "../images/languages/c-logo.svg";
import cppIcon from "../images/languages/c++-logo.svg";
import cSharpIcon from "../images/languages/csharp-logo.svg";

import goIconColor from "../images/languages/go-logo-colored.svg";
import rustIconColor from "../images/languages/rust-logo.svg";
import pythonIconColor from "../images/languages/python-logo-colored.svg";
import rubyIconColor from "../images/languages/ruby-logo-colored.svg";
import phpIconColor from "../images/languages/php-logo.svg";
import cIconColor from "../images/languages/c-logo-colored.svg";
import cppIconColor from "../images/languages/c++-logo-colored.svg";
import cSharpIconColor from "../images/languages/csharp-logo-colored.svg";

// Use cases
import binaryIcon from "../images/binary-icon.svg";
import featherIcon from "../images/feather-icon.svg";
import secureIcon from "../images/shield-icon.svg";

// Video
import Asciinema from "../components/asciinema";
import cast from "./term.json";

// Media
import wiredLogo from "../images/media/wired-logo.svg";

// Trusted By
import cosmosLogo from "../images/companies/cosmos.svg";
import spacemeshLogo from "../images/companies/spacemesh.svg";
import mozillaLogo from "../images/companies/mozilla.svg";
import netlifyLogo from "../images/companies/netlify.svg";
import zeitLogo from "../images/companies/zeit.svg";
import linkerdLogo from "../images/companies/linkerd.svg";

const ViewportAsciinema = handleViewport(Asciinema);

const embeddedUses = [
  {
    name: "Go",
    image: goIcon,
    imageColor: goIconColor,
    url: "https://github.com/wasmerio/go-ext-wasm"
  },
  {
    name: "Rust",
    image: rustIcon,
    imageColor: rustIconColor,
    url: "https://github.com/wasmerio/wasmer-rust-example"
  },
  {
    name: "Python",
    image: pythonIcon,
    imageColor: pythonIconColor,
    url: "https://github.com/wasmerio/python-ext-wasm"
  },
  {
    name: "Ruby",
    image: rubyIcon,
    imageColor: rubyIconColor,
    url: "https://github.com/wasmerio/ruby-ext-wasm"
  },
  {
    name: "PHP",
    image: phpIcon,
    imageColor: phpIconColor,
    url: "https://github.com/wasmerio/php-ext-wasm"
  },
  {
    name: "C",
    image: cIcon,
    imageColor: cIconColor,
    url: "https://github.com/wasmerio/wasmer-c-api"
  },
  {
    name: "C++",
    image: cppIcon,
    imageColor: cppIconColor,
    url: "https://github.com/wasmerio/wasmer-c-api"
  },
  {
    name: "C#",
    image: cSharpIcon,
    imageColor: cSharpIconColor,
    url: "https://github.com/migueldeicaza/WasmerSharp/"
  }
];

const packages = [
  {
    name: "webp",
    description:
      "WebP is a modern image format that provides superior lossless and lossy compression for images...",
    version: "0.0.2",
    username: "syrusakbary"
  },
  {
    name: "optipng",
    description:
      "OptiPNG is a PNG optimizer that recompresses image files to a smaller size, without losing any...",
    version: "0.1.2",
    username: "syrusakbary"
  },
  {
    name: "openssl",
    description:
      "OpenSSL is a robust, commercial-grade, and full-featured toolkit for the Transport Layer...",
    version: "0.1.0",
    username: "syrusakbary"
  },
  {
    name: "jedisct1/encpipe",
    description: "A small and secure file (and stream) encryption tool",
    version: "0.1.2",
    username: "jedisct1"
  },
  {
    name: "viu",
    description:
      "A small command-line application to view images from the terminal",
    version: "0.1.1",
    username: "syrusakbary"
  },
  {
    name: "robert/md5",
    description: "MD5 algorithm.",
    version: "0.1.2",
    username: "robert"
  }
];

const highlightedPackage = "openssl";

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
class Home extends React.Component {
  state = {
    playingAscii: false
  };
  render() {
    return (
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
                    <img
                      className={css.black}
                      src={embed.image}
                      alt={`${embed.name} icon`}
                    />
                    <img
                      className={css.color}
                      src={embed.imageColor}
                      alt={`${embed.name} icon`}
                    />
                  </a>
                );
              })}
            </ul>
          </div>
          <div className={css.explainer}>
            <div className={css.animation}>
              <div
                className={classnames(
                  css.explainerLanguages,
                  css.explainerActive
                )}
              >
                <div className={css.gridBox}>
                  <span>Go</span>
                </div>
                <div className={css.gridBox}>
                  <span>C</span>
                </div>
                <div className={css.gridBox}>
                  <span>Java</span>
                </div>
                <div className={classnames(css.gridBox, css.willBeActive)}>
                  <span>Rust</span>
                </div>
                <div className={css.gridBox}>
                  <span>C#</span>
                </div>
              </div>
              <div className={css.arrow1} />
              <div className={css.wasm} />
              <div className={css.arrow1} />
              <div className={classnames(css.explainerPlatforms)}>
                <div className={css.gridBox}>
                  <span>Linux</span>
                </div>
                <div className={css.gridBox}>
                  <span>Android</span>
                </div>
                <div className={classnames(css.gridBox, css.willBeActive)}>
                  <span>Mac</span>
                </div>
                <div className={css.gridBox}>
                  <span>WIN</span>
                </div>
                <div className={css.gridBox}>
                  <span>iOS</span>
                </div>
              </div>
            </div>
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
                Wasmer is also available on Windows.{" "}
                <a href="">Download it here</a>
              </div>
            </div>
            <div className={css.installVideo}>
              {/* echo $LINES $COLUMNS
          16 44 */}
              <ViewportAsciinema
                ref="asciinema"
                options={{
                  theme: {
                    foreground: "#ffffff",
                    background: "#231044",
                    black: "fdf6e3",
                    color0: "#231044",
                    color1: "#ff005b",
                    green: "#02C39A",
                    cyan: "#4AB3FF"
                  },
                  cols: 43,
                  rows: 16,
                  lineHeight: 1.1,
                  fontFamily: "Zeitung Mono Pro",
                  fontSize: 17
                }}
                cast={cast}
                play={this.state.playingAscii}
                onEnterViewport={() => {
                  this.setState({ playingAscii: true });
                }}
              />
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
                      className={css.gridBox}
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
          <ul class={css.packages}>
            {packages.map(pack => {
              return (
                <li
                  className={classnames({
                    [css.highlighted]: highlightedPackage === pack.name
                  })}
                >
                  <h5>{pack.name}</h5>
                  <p>{pack.description}</p>
                  <div>
                    {pack.version} • {pack.username}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={css.media}>
          <blockquote>
            <p>
              “This programming tool makes it easier for apps to work anywhere”
            </p>
            <a href="https://www.wired.com/story/programming-tool-makes-easier-apps-work-anywhere/">
              <img src={wiredLogo} />
            </a>
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

        <div className={css.trustedBy}>
          <span>Trusted by:</span>
          <img src={cosmosLogo} title="Cosmos logo" />
          <img src={spacemeshLogo} title="Spacemesh logo" />
          {/* <img src={mozillaLogo} title="Mozilla logo" /> */}
          <img src={netlifyLogo} title="Netlify logo" />
          <img src={zeitLogo} title="Zeit logo" />
          <img src={linkerdLogo} title="Linkerd logo" />
        </div>

        <Footer />
      </div>
    );
  }
}

export default Home;
