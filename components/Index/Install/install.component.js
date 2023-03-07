import React, { Component } from "react";
import handleViewport from "react-in-viewport";

import { AsciinemaComponent, SnippetComponent } from "./../../../components/";
import { isMobile } from "../../../utils";
import languages from "./../../Languages/languages.constants";
import { ColorDots } from "../../ColorDots/color-dots.component";
import { LanguageComponent } from "../../Languages/language.component";
import { StepperComponent } from "./components/Stepper/stepper.component";
import scenario from "./install.data";
import styles from "./install.module.css";

const Asciinema = handleViewport(AsciinemaComponent);

export class InstallComponent extends Component {
  state = {
    play: false,
    fontSettings: {
      fontFamily: "Zeitung Mono Pro",
      fontSize: 17,
    },
  };

  componentDidMount() {
    if (isMobile()) {
      this.setState({ fontSettings: {} });
    }
  }

  render() {
    const { play, fontSettings } = this.state;
    return (
      <div className={styles.root}>
        <div className="container">
          <div className="lg:flex justify-between items-center">
            <div className={`md:text-center lg:text-left ${styles.install}`}>
              <h2 className="font-bold mb-4">Try it now!</h2>
              <p className="mb-8 lg:mb-10 xl:mb-12 text">
                Install Wasmer by copy-pasting a single command. It’s that easy.
              </p>
              <div className="-mx-2">
                <SnippetComponent fadeOut />
              </div>
              <p className="text-xs mt-6">
                <span className="opacity-50">
                  Wasmer is also available on Windows.{" "}
                </span>
                <a
                  className="underline whitespace-nowrap opacity-50 hover:opacity-75 transition-all duration-200"
                  href="https://github.com/wasmerio/wasmer/releases"
                >
                  Download it here
                </a>
              </p>
            </div>
            <div className={`${styles.terminal}`}>
              <Asciinema
                options={{
                  theme: {
                    foreground: "#ffffff",
                    background: "#231044",
                    black: "#fdf6e3",
                    color0: "#231044",
                    color1: "#ff005b",
                    green: "#02C39A",
                    cyan: "#4AB3FF",
                  },
                  cols: 43,
                  rows: 16,
                  lineHeight: 1.1,
                  ...fontSettings,
                }}
                cast={scenario}
                play={this.state.play}
                onEnterViewport={() => {
                  this.setState({ play: true });
                }}
              />
              {play && <StepperComponent />}
            </div>
          </div>
          <div className={styles.embedContainer}>
            <p className={`${styles.embedText} text`}>
              ...or embed Wasmer into the language of your choice and run
              WebAssembly everywhere.
            </p>
            <div className={styles.gridLogos}>
              <div className={`dot-background dot-grid ${styles.grid}`}>
                <ColorDots items={75} distance={[1, 50]} />
              </div>
              <div
                className={`grid-container flex flex-wrap mt-dot-1 ml-dot-1 md:ml-dot-2 mb-dot-2 ${styles.gridContainer}`}
              >
                {languages.map(({ icon, url }, index) => (
                  <div className="mr-dot-1 mb-dot-1" key={index}>
                    <LanguageComponent icon={icon} link={url} highlighted />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
