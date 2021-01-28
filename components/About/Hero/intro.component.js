import React from 'react';
import styles from './intro.module.css';
import Heart from '../../../public/images/heart.svg';
import HeartLarge from '../../../public/images/heart-large.svg';
import { ColorDots } from '../../ColorDots/color-dots.component';

export const IntroComponent = () => {
  return (
    <div className="container lg:grid lg:grid-cols-2 lg:gap-8">
      <div className="relative -mx-8 lg:mx-0 lg:mr-10 xl:mr-16">
        <div className={`dot-background ${styles.grid}`}>
          <ColorDots items={75} distance={[1, 50]} variant="about" />
        </div>
        <div className="pt-4 px-4 relative flex justify-center lg:justify-end">
          <div className="mt-dot-1 md:mt-dot-3 lg:mt-dot-4 xl:mt-dot-5 mb-dot-2 md:mb-dot-4 lg:mr-dot-2 xl:mr-dot-3 flex">
            <Heart className="lg:hidden overflow-visible" />
            <HeartLarge className="hidden lg:block overflow-visible" />
          </div>
        </div>
      </div>
      <div className="pt-12 md:pt-16 md:px-14 lg:px-0 md:text-center lg:text-left lg:py-20 xl:py-32">
        <h1 className="text-secondary font-bold mb-4 md:md-6 lg:mb-10 xl:14">
          Making software universally available.
        </h1>
        <p className="text">
          Wasmer was founded to solve problems we faced ourselves every day.
          Now, we strive to contribute to developers and companies around the
          world reaching their full potential and we do it with a smile.
        </p>
        <p className="text mt-6">
          Our team is distributed but connected by a culture of diligence,
          amplified by passion rather than pressure. We don’t blame, we stay
          kind and value each other in good and in not so good times.
        </p>
      </div>
    </div>
  );
};
