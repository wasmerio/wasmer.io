import React, { Component } from 'react';
import { Timeline, Tween } from 'react-gsap';
import { Controller, Scene } from 'react-scrollmagic';
import styles from './explainer.module.css';
import WA from '../../../public/images/wasm-grey.svg';
import Wasmer from '../../../public/images/wasmer.svg';
import Plus from '../../../public/images/plus.svg';

import CPP from '../../../public/images/languages/cpp.svg';
import CSharp from '../../../public/images/languages/c-sharp.svg';
import Go from '../../../public/images/languages/go.svg';
import PHP from '../../../public/images/languages/php.svg';
import Python from '../../../public/images/languages/python.svg';
import Ruby from '../../../public/images/languages/ruby.svg';
import Rust from '../../../public/images/languages/rust.svg';

import IOS from '../../../public/images/platforms/ios.svg';
import Android from '../../../public/images/platforms/android.svg';
import Windows from '../../../public/images/platforms/windows.svg';
import Linux from '../../../public/images/platforms/linux.svg';
import MacOS from '../../../public/images/platforms/macos.svg';

import { LanguageComponent } from '../../Languages/language.component';

export class ExplainerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * Defines the margin on top of the dot pattern
       */
      marginTop: 0,

      paddingTop: 0,
      /**
       * Displays if the animation is scrolling vertically `true`.
       */
      animateVertically: false,
      /**
       * We need a left margin because the dot pattern is left orientated,
       * if the screen is mobile. The top pattern is centered all the time
       */
      marginLeft: 0,

      screenSmallerThanAnimation: false,
    };
    this.scene = React.createRef();
  }

  /**
   * Defines which size the background pattern has. It's defined in
   * CSS also. It can depend on screen-size.
   */
  getDotPatternSize() {
    //const { width } = this.getWindowDimensions();
    return 28; // 28 for all for now
  }

  /**
   * Returns viewport resolution.
   */
  getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  getAnimationHeights() {
    const { height, width } = this.getWindowDimensions();
    let gridHeight = height * 0.66,
      textcontainerHeight = height * 0.34;

    if (width < 650) {
      gridHeight = height * 0.5;
      textcontainerHeight = height * 0.5;
    }
    return { gridHeight, textcontainerHeight };
  }

  setFixedVariables() {
    const { gridHeight, textcontainerHeight } = this.getAnimationHeights();

    document.documentElement.style.setProperty(
      '--explainer-grid-height',
      `${gridHeight}px`,
    );
    document.documentElement.style.setProperty(
      '--explainer-textcontainer-height',
      `${textcontainerHeight}px`,
    );
  }

  /**
   * Calculates the state for vertical scrolling of the animation.
   * (It scrolls vertically on mobile and small screens.)
   */
  calcAnimateVertically() {
    const { width } = this.getWindowDimensions();
    let animateVertically = false,
      screenSmallerThanAnimation = false;
    if (width < 750) {
      animateVertically = true;
    }
    if (width < 1068) {
      screenSmallerThanAnimation = true;
    }
    this.setState({
      screenSmallerThanAnimation,
      animateVertically: animateVertically,
    });
  }

  /**
   * Because of the variable top pattern end we have to calculate
   * the top margin of the pattern. With this margin the patterns
   * are completely in sync.
   */
  calcMarginTop() {
    const { gridHeight } = this.getAnimationHeights();
    const { width } = this.getWindowDimensions();
    const playgroundSize = gridHeight; // 0.66 because of the 66vh of the pattern
    const dotPatternSize = this.getDotPatternSize();
    // the first dot is with an offset of 1/2 pattern size,
    // minus 4 px because of the dot itself and the border
    // of the elements in animation
    const dotOffset = dotPatternSize / 2 - 4;
    const positionedDots =
      (playgroundSize - (playgroundSize % dotPatternSize)) / dotPatternSize;
    // how much grid is needed for the animation?
    const animationGridHeight = this.getAnimationGridHeight();
    // get the offset
    const offset = Math.round((positionedDots - animationGridHeight) / 2) - 1;
    let marginTopAmount = dotOffset + offset * dotPatternSize;
    if(marginTopAmount < dotPatternSize * 2) {
      marginTopAmount += dotPatternSize * 2 + 4;
    }
    const marginTop = width > 1068 ? marginTopAmount : 0;
    this.setState({ marginTop });
  }

  /**
   * Because of the variable top pattern end we have to calculate
   * the top margin of the pattern. With this margin the patterns
   * are completely in sync.
   */
  calcPaddingTop() {
    const { height, width } = this.getWindowDimensions();
    const playgroundSize = height / 2; // 0.66 because of the 66vh of the pattern
    const dotPatternSize = this.getDotPatternSize();
    // the first dot is with an offset of 1/2 pattern size,
    // minus 4 px because of the dot itself and the border
    // of the elements in animation
    const dotOffset = dotPatternSize / 2 - 4;
    const positionedDots =
      (playgroundSize - (playgroundSize % dotPatternSize)) / dotPatternSize;
    // how much grid is needed for the animation?
    const animationGridHeight = this.getAnimationGridHeight();
    // get the offset
    const offset = Math.round((positionedDots - animationGridHeight) / 2) - 2;
    const paddingTop =
      width < 1068 ? dotOffset + offset * dotPatternSize + 16 : 0;
    this.setState({ paddingTop });
  }

  getAnimationGridHeight() {
    const { width } = this.getWindowDimensions();
    if(width < 650) return 3;
    return width > 1090 ? 12 : 16;
  }

  /**
   * Helper to get the container width.
   */
  calcContainerWidth() {
    const { width } = this.getWindowDimensions();
    const dotPatternSize = this.getDotPatternSize();
    const divider = width / dotPatternSize;
    const containerWidth = Math.max(dotPatternSize * Math.floor(divider), 744);
    this.setState({ containerWidth });
  }

  isTouchDevice() {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Calcs margin Left of the pattern for small devices
   * where the second pattern is left oriented.
   */
  calcMarginLeft() {
    const { width } = this.getWindowDimensions();
    const dotPatternSize = this.getDotPatternSize();
    // const marginLeft = ((dotPatternSize - ((width % dotPatternSize) / 2)) - dotPatternSize) * -1
    let marginLeft = (width % dotPatternSize) / 2;
    const indicator = (width / dotPatternSize) % 2;
    if (indicator < 1) {
      marginLeft = marginLeft - dotPatternSize / 2;
    }
    this.setState({ marginLeft });
    return marginLeft;
  }

  componentDidMount() {
    this.setFixedVariables();
    this.calcMarginTop();
    this.calcContainerWidth();
    this.calcAnimateVertically();
    this.calcPaddingTop();
    if (!this.isTouchDevice()) {
      window.addEventListener(
        'resize',
        () => {
          this.setFixedVariables();
          this.calcMarginTop();
          this.calcContainerWidth();
          this.calcAnimateVertically();
          this.calcPaddingTop();
          document.getElementById('explainer').style.marginTop = 0;
        },
        { passive: true },
      );
    }
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  render() {
    const { containerWidth, animateVertically } = this.state;

    var languages = this.getLanguages();
    var platforms = this.getPlatforms();

    // apply extra styles, based on
    let explainerStyle = this.getExplainerStyle(animateVertically);

    return (
          <div className="overflow-hidden">
            {/* REMOVE Helper */}
            <div className={styles.animationHelper}>
              <div data-step="100" style={{top: 100}}></div>
              <div data-step="200" style={{top: 200}}></div>
              <div data-step="300" style={{top: 300}}></div>
              <div data-step="400" style={{top: 400}}></div>
              <div data-step="500" style={{top: 500}}></div>
              <div data-step="600" style={{top: 600}}></div>
              <div data-step="700" style={{top: 700}}></div>
              <div data-step="800" style={{top: 800}}></div>
              <div data-step="900" style={{top: 900}}></div>
            </div>
            <Controller>
              <Scene
                  duration={1000}
                  pin
                  triggerElement="#explainer"
                  triggerHook="onLeave"
                  indicators={true}
              >
                {(progress) => (
                    <div id="explainer" className={styles.hero} style={{marginTop: '0 !important'}}>
                      <Timeline totalProgress={progress}>
                        <div className={styles.explainerContainer} style={{ 'transform': this.state.animateVertically && progress > 0.65 ? 'translate3D(-40%, 0, 0)' : '' }}>
                          {/* REMOVE Progress Indicator */}
                          <div className="fixed top-0 right-0 mt-4 mr-4">{progress}</div>
                          <div
                              className={styles.explainer}
                              style={explainerStyle}
                          >
                            {/* Languages */}
                            <Tween duration={100} />
                            <div
                              className={`
                                ${styles.itemsGrid}
                                ${styles.languages}
                                ${progress > 0.3 ? styles.hideAdditional : ''}
                              `}
                            >
                              {languages.map((item, key) => {
                                if (item.icon === "") {
                                  return (
                                    <div key={key} className={styles.empty} />
                                  )
                                }

                                return (
                                  <div
                                    key={key}
                                    className={`
                                      ${styles.transitionContainer}
                                      ${item.hideOnTablet ? styles.hideOnTablet : ''}
                                      ${item.main ? styles.main : ''}
                                    `}
                                  >
                                    <LanguageComponent
                                      large
                                      icon={item.icon}
                                      highlighted={item.main && progress > 0 && progress < 0.5}
                                      className={item.main ? styles.main : ''}
                                    />
                                  </div>
                                )
                              })}
                            </div>

                            {/* Arrow 1 */}
                            <div className={styles.arrowContainer}>
                              <div className={styles.arrowMask}>
                                <Tween duration={300} from={{ 'transform': 'translate3D(-100%, 0, 0)' }} to={{ 'transform': 'translate3D(0, 0, 0)' }}>
                                  <div className={`${ progress < 0.5 ? styles.arrowFill : 'opacity-0'}`} />
                                </Tween>
                              </div>
                            </div>

                            {/* WA */}
                            <Tween duration={100} />
                            <div className={`${styles.iconContainer} ${ progress > 0.3 && progress < 0.8 ? styles.highlighted : ''}`}>
                              <WA />
                            </div>

                            {/* Arrow 2 */}
                            <div className={styles.arrowContainer}>
                              <div className={styles.arrowMask}>
                                <Tween duration={300} from={{ left: '-100%' }} to={{ left: '0' }}>
                                  <div className={`${ progress < 0.8 ? styles.arrowFill : 'opacity-0'}`} />
                                </Tween>
                              </div>
                            </div>

                            {/* Wasmer & Plus */}
                            <Tween duration={200} />
                            <div className="flex items-center">
                              <div className={`${styles.iconContainer} ${styles.wasmerIcon} ${progress >= 0.8 ? styles.highlighted : ''}`}>
                                <Wasmer />
                              </div>
                              <div className={`${styles.iconContainer} ${styles.plus} ${progress >= 0.8 ? styles.highlighted : ''}`}>
                                <Plus />
                              </div>
                            </div>

                            {/* Platforms */}
                            <div
                              className={`
                                ${styles.itemsGrid}
                                ${styles.platforms}
                                ${progress < 0.8 ? styles.hideAdditional : ''}
                              `}
                            >
                              {platforms.map((item, key) => {
                                if (item.icon === "") {
                                  return (
                                      <div key={key} className={styles.empty} />
                                  )
                                }

                                return (
                                  <div
                                    key={key}
                                    className={`
                                      ${styles.transitionContainer}
                                      ${item.main ? styles.main : ''}
                                    `}
                                  >
                                    <LanguageComponent
                                        large
                                        icon={item.icon}
                                        highlighted={item.main && progress >= 0.8}
                                        className={item.main ? styles.main : ''}
                                    />
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                        <div className={`container ${styles.headlineContainer}`}>
                          <h2
                            className={`${styles.headline} text-left md:text-center my-24`}
                          >
                            <span className={progress < 0.3 ? styles.highlightedText : ''}>
                              Use the tools you know and the languages you love.{' '}
                            </span>
                            <span className={(progress > 0.3 && progress < 0.8) ? styles.highlightedText : ''}>
                              Compile everything to WebAssembly. {' '}
                            </span>
                            <span className={(progress >= 0.8) ? styles.highlightedText : ''}>
                              Run it on any OS or embed it into other languages.
                            </span>
                          </h2>
                        </div>
                      </Timeline>
                    </div>
                )}
              </Scene>
            </Controller>
          </div>
    );
  }

  getExplainerStyle(animateVertically) {
    let explainerStyle = {
      marginTop: this.state.marginTop,
      // width: `${containerWidth}px`,
    };
    if (!animateVertically) {
      explainerStyle['left'] = 0;
    } else {
      delete explainerStyle['left'];
    }

    if (this.state.screenSmallerThanAnimation) {
      explainerStyle['paddingTop'] = this.state.paddingTop + 10;
      // explainerStyle['marginLeft'] = this.state.marginLeft;
    }
    return explainerStyle;
  }

  getLanguages() {
    var languages = [
      {
        icon: <PHP/>
      },
      {
        icon: <CSharp/>
      },
      {
        icon: <CPP/>
      },
      {
        icon: <Python/>
      },
      {
        icon: <Rust/>,
      },
      {
        icon: <Ruby/>
      },
      {
        icon: <Go/>
      },
    ];

    languages = this.shuffle(languages).map(function (language, key) {
      if (key === 1) {
        language['hideOnTablet'] = true
      }
      if (key === 4) {
        language['main'] = true;
      }
      return language;
    });

    languages.unshift(
        {
          icon: ''
        })
    return languages;
  }

  getPlatforms() {
    var platforms = [
      {
        icon: <IOS/>
      },
      {
        icon: <Android/>
      },
      {
        icon: <Windows/>
      },
      {
        icon: <Linux/>
      },
      {
        icon: <MacOS/>
      },
    ];


    platforms = this.shuffle(platforms).map(function (language, key) {
      if (key === 2) {
        language['main'] = true;
      }
      return language;
    });

    platforms.splice(4, 0,
        {
          icon: ''
        });
    return platforms;
  }
}
