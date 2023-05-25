import React, { Component } from 'react';
import testimonials from './testimonials.constants';
import styles from './testimonials.module.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export class TestimonialsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      centerSlidePercentage: 20,
    };

    this.updateCurrentSlide = this.updateCurrentSlide.bind(this);
    this.getWindowDimensions = this.getWindowDimensions.bind(this);
    this.calcCenterSlidePercentage = this.calcCenterSlidePercentage.bind(this);
  }

  updateCurrentSlide(index) {
    const { currentSlide } = this.state;

    if (currentSlide !== index) {
      this.setState({
        currentSlide: index,
      });
    }
  }

  componentDidMount() {
    this.calcCenterSlidePercentage();
    window.addEventListener('resize', this.calcCenterSlidePercentage, {
      passive: true,
    });
  }

  calcCenterSlidePercentage() {
    let centerSlidePercentage = 100 / testimonials.length;
    if (centerSlidePercentage < 20) centerSlidePercentage = 20;

    const { width } = this.getWindowDimensions();

    if (centerSlidePercentage > 30 && width > 800) {
      centerSlidePercentage = 30;
    }
    if (centerSlidePercentage < 30 && width < 900) {
      centerSlidePercentage = 30;
    }

    if (width < 600) {
      centerSlidePercentage = 40;
    }

    if (width < 500) {
      centerSlidePercentage = 50;
    }

    if (width > 1300 && centerSlidePercentage >= 20) {
      centerSlidePercentage = 15;
    }

    if (width > 1800 && centerSlidePercentage < 13) {
      centerSlidePercentage = 13;
    }

    this.setState({ centerSlidePercentage });
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

  render() {
    //
    // let countAuthors = testimonials.filter(({author}) => (!!author)).length;
    // console.log(countAuthors);
    // testimonials = testimonials.map((testimonial, index) => {
    //     testimonial['authorsBefore'] = testimonials.filter((testimonialInner, indexInner) => {
    //         return testimonialInner.author && indexInner < index
    //     });
    //     return testimonial;
    // });

    return (
      <div className="my-page">
        <div className="text-left sm:text-center mt-page">
          <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            autoPlay
            infiniteLoop
            interval={5000}
            selectedItem={this.state.currentSlide}
            onChange={this.updateCurrentSlide}
          >
            {testimonials.map(({ quote, link, author, textSize }) => (
              <div
                className="text-left sm:text-center px-8 sm:px-0"
                key={`${quote}-${link}`}
              >
                <blockquote>
                  <p
                    className={`mx-auto text-primary sm:w-2/3 mb-4 text-${textSize} text-left sm:text-center font-medium ${styles.quote}`}
                  >
                    {quote}
                  </p>
                </blockquote>
                <span className="text-sm text-left sm:text-center text-primary">
                  {author ? author : ''}
                </span>
              </div>
            ))}
          </Carousel>
        </div>

        <div>
          <Carousel
            swipeable={false}
            showArrows={false}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            centerMode
            centerSlidePercentage={this.state.centerSlidePercentage}
            interval={5000}
            selectedItem={this.state.currentSlide}
            onChange={this.updateCurrentSlide}
          >
            {testimonials.map(({ imageHeight, image }, key) => (
              <a
                onClick={() => {
                  this.updateCurrentSlide(key);
                }}
                key={`${key}`}
                className={`no-underline h-full w-50 flex justify-center items-center`}
              >
                <img
                  className={`${
                    imageHeight ? `h-${imageHeight} w-${imageHeight} ` : ''
                  } ${this.state.currentSlide !== key ? styles.inactive : ''} 
                                block object-scale-down `}
                  src={`images/testimonials/${image}`}
                />
              </a>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
}
