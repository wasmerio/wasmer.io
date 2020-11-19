import React, { Component } from 'react';
import { Timeline, Tween } from 'react-gsap';
import { Controller, Scene } from 'react-scrollmagic';
import styles from './explainer.module.css';
import WA from '../../../public/images/wasm-grey.svg';
import Wasmer from '../../../public/images/wasmer.svg';
import Plus from '../../../public/images/plus.svg';

import C from '../../../public/images/languages/c.svg';
import CPP from '../../../public/images/languages/cpp.svg';
import CSharp from '../../../public/images/languages/c-sharp.svg';
import Elixir from '../../../public/images/languages/elixir.svg';
import Go from '../../../public/images/languages/go.svg';
import Java from '../../../public/images/languages/java.svg';
import JavaScript from '../../../public/images/languages/javascript.svg';
import PHP from '../../../public/images/languages/php.svg';
import Postgres from '../../../public/images/languages/postgress.svg';
import Python from '../../../public/images/languages/python.svg';
import R from '../../../public/images/languages/r.svg';
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
    // if (width < 1068) {
    //   screenSmallerThanAnimation = true;
    // }

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
    const marginTop = width > 1068 ? dotOffset + offset * dotPatternSize : 0;
    this.setState({ marginTop });
  }

  /**
   * Because of the variable top pattern end we have to calculate
   * the top margin of the pattern. With this margin the patterns
   * are completely in sync.
   */
  calcPaddingTop() {
    const { height, width } = this.getWindowDimensions();
    const playgroundSize = height * 0.66; // 0.66 because of the 66vh of the pattern
    const dotPatternSize = this.getDotPatternSize();
    // the first dot is with an offset of 1/2 pattern size,
    // minus 4 px because of the dot itself and the border
    // of the elements in animation
    const dotOffset = dotPatternSize / 2 - 4;
    const positionedDots =
      (playgroundSize - (playgroundSize % dotPatternSize)) / dotPatternSize;
    // how much grid is needed for the animation?
    const animationGridHeight = this.getAn;
    // get the offset
    const offset = Math.round((positionedDots - animationGridHeight) / 2) - 1;
    const paddingTop =
      width < 1068 ? dotOffset + offset * dotPatternSize + 16 : 0;
    this.setState({ paddingTop });
  }

  getAnimationGridHeight() {
    const { width } = this.getWindowDimensions();
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
    this.calcMarginLeft();
    this.calcPaddingTop();
    if (!this.isTouchDevice()) {
      window.addEventListener(
        'resize',
        () => {
          this.setFixedVariables();
          this.calcMarginTop();
          this.calcContainerWidth();
          this.calcAnimateVertically();
          this.calcMarginLeft();
          this.calcPaddingTop();
        },
        { passive: true },
      );
    }
  }

  render() {
    const { containerWidth, animateVertically } = this.state;

    const languages = [
      {
        icon: ''
      },
      {
        icon: <PHP />
      },
      {
        icon: <CSharp />,
        hideOnTablet: true
      },
      {
        icon: <CPP />
      },
      {
        icon: <Python />
      },
      {
        icon: <Rust />,
        main: true
      },
      {
        icon: <Ruby />
      },
      {
        icon: <Go />
      },
    ]

    const platforms = [
      {
        icon: <IOS />
      },
      {
        icon: <Android />
      },
      {
        icon: <Windows />,
        main: true
      },
      {
        icon: <Linux />
      },
      {
        icon: ''
      },
      {
        icon: <MacOS />
      },
    ]

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
      explainerStyle['marginLeft'] = this.state.marginLeft;
    }

    return (
          <div>
            <Controller>
              <Scene
                  triggerHook="onLeave"
                  duration={1000}
                  pin
                  triggerElement="#explainer"
                  indicators={true}
              >
                {(progress) => (
                    <div id="explainer" className={styles.hero}>
                      <Timeline totalProgress={progress} paused>
                        <div className={styles.explainerContainer}>
                          <div
                              className={styles.explainer}
                              style={explainerStyle}
                          >
                            {/* Languages */} {/* TODO: Toggle 1 global class for all languages */}
                            <div className={styles.languages}>
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
                                          // TODO: Toggle .highlighted class for Rust Icon when highlighed
                                      />
                                    </div>
                                )
                              })}
                            </div>

                            {/* Arrow 1 */} {/* TODO: Move left from -100% to 0 */}
                            <div className={styles.arrowContainer}>
                              <div className={styles.arrowMask}>
                                <Tween duration={200} from={{ left: '-100%' }} to={{ left: '0' }}>
                                  <div className={`${ progress < 0.5 ? styles.arrowFill : 'hidden'}`} />
                                </Tween>
                              </div>
                            </div>

                            {/* WA */} {/* TODO: Toggle .highlighted class */}
                            <div className={`${styles.iconContainer} ${ progress > 0.5 && progress < 1 ? styles.highlighted : ''}`}>
                              <WA />
                            </div>

                            {/* Arrow 2 */} {/* TODO: Move left from -100% to 0, reuse markup */}
                            <div className={styles.arrowContainer}>
                              <div className={styles.arrowMask}>
                                <Tween duration={200} from={{ left: '-100%' }} to={{ left: '0' }}>
                                  <div className={`${ progress < 1 ? styles.arrowFill : 'hidden'}`} />
                                </Tween>
                              </div>
                            </div>

                            {/* Wasmer & Plus */} {/* TODO: Toggle .highlighted class */}
                            <div className="flex items-center">
                              <div className={`${styles.iconContainer} ${styles.wasmerIcon} ${progress >= 1 ? styles.highlighted : ''}`}>
                                <Wasmer />
                              </div>
                              <div className={`${styles.iconContainer} ${styles.plus} ${progress >= 1 ? styles.highlighted : ''}`}>
                                <Plus />
                              </div>
                            </div>

                            {/* Platforms */} {/* TODO: Toggle 1 global class for all languages */}
                            <div className={styles.platforms}>
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
                                          highlighted={item.main && progress >= 1}
                                          // TODO: Toggle .highlighted class for Windows Icon when highlighed
                                      />
                                    </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                        <div className={styles.headlineContainer}>
                          <h2
                              className={`${styles.headline} text-left px-8 md:px-0 sm:text-center my-24`}
                          >
                            <Timeline
                                position={2}
                                target={
                                  <span className={styles.blockOnDesktop}>
                            Use the tools you know and the languages you love.{' '}
                          </span>
                                }
                            >
                              <Tween
                                  duration={0.01}
                                  from={{ color: '#4946DD' }}
                                  to={{ color: '#BDB7C7' }}
                              />
                            </Timeline>
                            <Timeline
                                position={2}
                                target={
                                  <span>Compile everything to WebAssembly. </span>
                                }
                            >
                              <Tween duration={0.01} to={{ color: '#4946DD' }} />
                              <Tween
                                  delay={3}
                                  duration={0.01}
                                  to={{ color: '#BDB7C7' }}
                              />
                            </Timeline>
                            <Timeline
                                position={5}
                                target={
                                  <span>
                            Run it on any
                            <br className={styles.breakOnDesktop} />
                            OS or embed it into other languages.
                          </span>
                                }
                            >
                              <Tween duration={0.01} to={{ color: '#4946DD' }} />
                            </Timeline>
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
}


// {(progress) => (
//   <div id="explainer" className={styles.hero}>
//     <Timeline totalProgress={progress} paused>
//       <div className={styles.explainerContainer}>
//         <Timeline
//           position={0}
//           target={
//             <div
//               className={styles.explainer}
//               style={explainerStyle}
//             >
//               <div className={styles.languages}>
//                 <div className={styles.empty} />
//                 <div className={styles.restVisibleOnDesktop}>
//                   <Timeline
//                     position={1}
//                     target={
//                       <div className={styles.transitionContainer}>
//                         <LanguageComponent
//                           large
//                           icon={<PHP />}
//                         />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       duration={0.01}
//                       from={{ opacity: 1 }}
//                       to={{ opacity: 0 }}
//                     />
//                   </Timeline>
//                 </div>
//                 <div className={styles.rest}>
//                   <Timeline
//                     position={1}
//                     target={
//                       <div className={styles.transitionContainer}>
//                         <LanguageComponent
//                           large
//                           icon={<CSharp />}
//                         />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       duration={0.01}
//                       from={{ opacity: 1 }}
//                       to={{ opacity: 0 }}
//                     />
//                   </Timeline>
//                 </div>
//                 <div className={styles.rest}>
//                   <Timeline
//                     position={1}
//                     duration={0.01}
//                     target={
//                       <div className={styles.transitionContainer}>
//                         <LanguageComponent
//                           large
//                           icon={<CPP />}
//                         />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       from={{ opacity: 1 }}
//                       to={{ opacity: 0 }}
//                     />
//                   </Timeline>
//                 </div>
//                 <div className={styles.rest}>
//                   <Timeline
//                     position={1}
//                     target={
//                       <div className={styles.transitionContainer}>
//                         <LanguageComponent
//                           large
//                           icon={<Python />}
//                         />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       duration={0.01}
//                       from={{ opacity: 1 }}
//                       to={{ opacity: 0 }}
//                     />
//                   </Timeline>
//                 </div>
//                 <div className="relative">
//                   <LanguageComponent
//                     large
//                     icon={<Rust />}
//                   />
//                   <Timeline
//                     position={2}
//                     target={
//                       <div className={`${styles.highlight}`}>
//                         <LanguageComponent
//                           large
//                           highlighted
//                           icon={<Rust />}
//                         />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       duration={0.01}
//                       from={{ opacity: 1 }}
//                       to={{ opacity: 0 }}
//                     />
//                   </Timeline>
//                 </div>
//                 <div className={styles.rest}>
//                   <Timeline
//                     position={1}
//                     target={
//                       <div className={styles.transitionContainer}>
//                         <LanguageComponent
//                           large
//                           icon={<Ruby />}
//                         />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       duration={0.01}
//                       from={{ opacity: 1 }}
//                       to={{ opacity: 0 }}
//                     />
//                   </Timeline>
//                 </div>
//                 <div className={styles.rest}>
//                   <Timeline
//                     position={1}
//                     target={
//                       <div className={styles.transitionContainer}>
//                         <LanguageComponent
//                           large
//                           icon={<Go />}
//                         />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       duration={0.01}
//                       from={{ opacity: 1 }}
//                       to={{ opacity: 0 }}
//                     />
//                   </Timeline>
//                 </div>
//                 <div className={styles.restVisibleOnTablet}>
//                   <Timeline
//                     position={1}
//                     target={
//                       <div className={styles.transitionContainer}>
//                         <LanguageComponent
//                           large
//                           icon={<PHP />}
//                         />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       duration={0.01}
//                       from={{ opacity: 1 }}
//                       to={{ opacity: 0 }}
//                     />
//                   </Timeline>
//                 </div>
//                 <div className={styles.empty} />
//               </div>
//               <div className={styles.heightSizer}>
//                 <div className={styles.arrowContainer}>
//                   <div className={styles.arrowContainerInner}>
//                     <Timeline
//                       position={0}
//                       target={
//                         <div className={styles.arrowMask}></div>
//                       }
//                     >
//                       <Tween from={{ left: 0 }} to={{ left: 50 }} />
//                     </Timeline>
//                     <Timeline
//                       position={1}
//                       target={
//                         <img
//                           className={styles.arrow}
//                           src="images/arrow_color.svg"
//                         />
//                       }
//                     >
//                       <Tween
//                         from={{ zIndex: 3 }}
//                         to={{ zIndex: 2 }}
//                       />
//                     </Timeline>
//                     <img
//                       className={styles.arrowGrey}
//                       src="images/arrow.svg"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className={styles.waContainer}>
//                 <div className={styles.waContainerInner}>
//                   <Timeline
//                     position={2}
//                     target={
//                       <div className={styles.color}>
//                         <WA />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       duration={0.01}
//                       toggleClass='highlighted'
//                     />
//                   </Timeline>
//                   <Timeline
//                     position={4}
//                     target={<div className={styles.grey} />}
//                   >
//                     <Tween
//                       from={{ zIndex: 3 }}
//                       to={{ zIndex: 5 }}
//                     />
//                   </Timeline>
//                 </div>
//               </div>
//               <div className={styles.heightSizer}>
//                 <div className={styles.arrowContainer}>
//                   <div className={styles.arrowContainerInner}>
//                     <Timeline
//                       position={4}
//                       target={
//                         <img
//                           className={styles.arrow}
//                           src="images/arrow_color.svg"
//                         />
//                       }
//                     >
//                       <Tween
//                         from={{ zIndex: 3 }}
//                         to={{ zIndex: 2 }}
//                       />
//                     </Timeline>
//                     <Timeline
//                       position={3}
//                       target={
//                         <div className={styles.arrowMask}></div>
//                       }
//                     >
//                       <Tween from={{ left: 0 }} to={{ left: 50 }} />
//                     </Timeline>
//                     <img
//                       className={styles.arrowGrey}
//                       src="images/arrow.svg"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className={styles.heightSizer}>
//                 <div className={styles.wasmerContainer}>
//                   <Timeline
//                     position={5}
//                     target={<div className={styles.color} />}
//                   >
//                     <Tween
//                       duration={0.01}
//                       from={{ opacity: 0 }}
//                       to={{ opacity: 1 }}
//                     />
//                   </Timeline>
//                   <div className={styles.grey} />
//                 </div>
//               </div>

//               <div className={styles.heightSizer}>
//                 <div className={styles.plusContainer}>
//                   <div className={styles.plusContainerInner}>
//                     <Timeline
//                       position={5}
//                       target={
//                         <img
//                           className={styles.plus}
//                           src="images/plus_color.svg"
//                         />
//                       }
//                     >
//                       <Tween
//                         duration={0.01}
//                         from={{ opacity: 0 }}
//                         to={{ opacity: 1 }}
//                       />
//                     </Timeline>
//                     <img
//                       className={styles.plusGrey}
//                       src="images/plus.svg"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className={styles.platforms}>
//                 <div className={styles.rest}>
//                   <Timeline
//                     position={5}
//                     target={
//                       <div className={styles.transitionContainer}>
//                         <LanguageComponent
//                           large
//                           icon={<IOS />}
//                         />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       duration={0.01}
//                       from={{ opacity: 0 }}
//                       to={{ opacity: 1 }}
//                     />
//                   </Timeline>
//                 </div>
//                 <div className={styles.rest}>
//                   <Timeline
//                     position={5}
//                     target={
//                       <div className={styles.transitionContainer}>
//                         <LanguageComponent
//                           large
//                           icon={<Android />}
//                         />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       duration={0.01}
//                       from={{ opacity: 0 }}
//                       to={{ opacity: 1 }}
//                     />
//                   </Timeline>
//                 </div>
//                 <div className={styles.mainItem}>
//                   <Timeline
//                     position={5}
//                     target={
//                       <div className={`${styles.transitionContainer} ${styles.highlight}`}>
//                         <LanguageComponent
//                           large
//                           highlighted
//                           icon={<Windows />}
//                         />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       duration={0.01}
//                       from={{ opacity: 0 }}
//                       to={{ opacity: 1 }}
//                     />
//                   </Timeline>
//                   <div className={styles.transitionContainer}>
//                     <LanguageComponent
//                       large
//                       icon={<Windows />}
//                     />
//                   </div>
//                 </div>
//                 <div className={styles.rest}>
//                   <Timeline
//                     position={5}
//                     target={
//                       <div className={styles.transitionContainer}>
//                         <LanguageComponent
//                           large
//                           icon={<Linux />}
//                         />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       duration={0.01}
//                       from={{ opacity: 0 }}
//                       to={{ opacity: 1 }}
//                     />
//                   </Timeline>
//                 </div>
//                 <div className={styles.empty} />
//                 <div className={styles.rest}>
//                   <Timeline
//                     position={5}
//                     target={
//                       <div className={styles.transitionContainer}>
//                         <LanguageComponent
//                           large
//                           icon={<MacOS />}
//                         />
//                       </div>
//                     }
//                   >
//                     <Tween
//                       duration={0.01}
//                       from={{ opacity: 0 }}
//                       to={{ opacity: 1 }}
//                     />
//                   </Timeline>
//                 </div>
//               </div>
//             </div>
//           }
//         >
//           <Tween delay={-3} to={{ right: 0 }} />
//         </Timeline>
//       </div>
//       <div className={styles.headlineContainer}>
//         <h2
//           className={`${styles.headline} text-left px-8 md:px-0 sm:text-center my-24`}
//         >
//           <Timeline
//             position={2}
//             target={
//               <span className={styles.blockOnDesktop}>
//                 Use the tools you know and the languages you love.{' '}
//               </span>
//             }
//           >
//             <Tween
//               duration={0.01}
//               from={{ color: '#4946DD' }}
//               to={{ color: '#BDB7C7' }}
//             />
//           </Timeline>
//           <Timeline
//             position={2}
//             target={
//               <span>Compile everything to WebAssembly. </span>
//             }
//           >
//             <Tween duration={0.01} to={{ color: '#4946DD' }} />
//             <Tween
//               delay={3}
//               duration={0.01}
//               to={{ color: '#BDB7C7' }}
//             />
//           </Timeline>
//           <Timeline
//             position={5}
//             target={
//               <span>
//                 Run it on any
//                 <br className={styles.breakOnDesktop} />
//                 OS or embed it into other languages.
//               </span>
//             }
//           >
//             <Tween duration={0.01} to={{ color: '#4946DD' }} />
//           </Timeline>
//         </h2>
//       </div>
//     </Timeline>
//   </div>
// )}
// </Scene>
