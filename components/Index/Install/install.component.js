import React, { Component } from 'react';
import handleViewport from 'react-in-viewport';
import { ColorDots } from '../../ColorDots/color-dots.component';
import { isMobile } from "../../../utils";
import { LanguageComponent } from '../../Languages/language.component';
import { AsciinemaComponent, SnippetComponent } from './../../../components/';
import languages from './../../Languages/languages.constants';
import { StepperComponent } from './components/Stepper/stepper.component';
import scenario from './install.data';
import styles from './install.module.css';

const Asciinema = handleViewport(AsciinemaComponent);

export class InstallComponent extends Component {
  state = {
    play: false,
    fontSettings: {
      fontFamily: 'Zeitung Mono Pro',
      fontSize: 17
    }
  };

  componentDidMount() {
    if (isMobile()) {
      this.setState({ fontSettings: {} });
    }
  }

  render() {
    const { play, fontSettings } = this.state;
    return (
      <div className="my-page md:pb-32 relative">
        <div className={styles.grid}>
          <ColorDots items={75} distance={[1, 50]} />
        </div>
        <div className="container flex flex-col lg:flex-row items-center">
          <div className={`md:text-center lg:text-left ${styles.install}`}>
            <h2 className="font-bold mb-4 xl:mb-6">Try it now!</h2>
            <p className="mb-8 lg:mb-10 xl:mb-12">
              Install Wasmer by copy-pasting a single command. It’s that easy.
            </p>
            <div className="-mx-2">
              <SnippetComponent />
            </div>
            <p className="text-xs mt-6">
              <span className="opacity-50">
                Wasmer is also available on Windows.{' '}
              </span>
              <a
                className="underline whitespace-no-wrap opacity-50 hover:opacity-75 transition transition-opacity duration-200"
                href="https://github.com/wasmerio/wasmer/releases"
              >
                Download it here
              </a>
            </p>
          </div>
          <div
            className={`md:mt-16 lg:mt-0 lg:pt-0 pb-8 ${styles.installVideo}`}
          >
            <Asciinema
              options={{
                theme: {
                  foreground: '#ffffff',
                  background: '#231044',
                  black: '#fdf6e3',
                  color0: '#231044',
                  color1: '#ff005b',
                  green: '#02C39A',
                  cyan: '#4AB3FF',
                },
                cols: 43,
                rows: 16,
                lineHeight: 1.1,
                ...fontSettings
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

        <div className="container">
          <div className={styles.embed}>
            <p className="box-border mt-12 inline-block align-top w-full sm:w-1/2 md-full lg:w-1/2 pr-16 mb-10 sm:mb-0">
              ...or embed Wasmer into the language of your choice and run
              WebAssembly everywhere.
            </p>
            <div className={styles.embedLanguages}>
              {languages.map(({ name, icon, url }, index) => (
                <div className={styles.gridBoxContainer} key={index}>
                  <LanguageComponent
                    key={name}
                    highlighted
                    icon={icon}
                    link={url}
                    title={`Wasmer ${name} WebAssembly library`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
