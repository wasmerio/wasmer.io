import React, { Component } from 'react';
import styles from './github-counter.module.css';

// The default number of stars to show
const DEFAULT_NUM_STARS = 15000;

export class GithubCounterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: DEFAULT_NUM_STARS,
      animate: props['animate'],
      update: false,
    };
  }

  getCounter = async () => {
    if (typeof window === "undefined") return DEFAULT_NUM_STARS;
    const resource = await fetch(
      'https://api.github.com/repos/wasmerio/wasmer',
    );
    const data = await resource.json();
    return data.stargazers_count;
  };

  componentDidMount() {
    this.getCounter().then((counter) => {
      this.setState({ counter });

      if (this.state.animate) {
        setTimeout(() => {
          this.setState({
            update: true,
          });
        }, 1000);
      }
    });
  }

  animateCounter(start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const counter = Math.floor(progress * (end - start) + start);
      this.setState({ counter });
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  render() {
    const { counter, update } = this.state;
    // const counterBefore = counter - 1;

    if (this.state.animate) {
      return (
        <span className={styles.root}>
          {counter.toLocaleString().slice(0, -1)}
          <span
            className={`${styles.animation} ${update ? styles.update : ''}`}
          >
            <span className={styles.animationContainer}>
              <span>{(counter - 1).toLocaleString().slice(-1)}</span>
              <span>{counter.toLocaleString().slice(-1)}</span>
            </span>
          </span>
        </span>
      );
    }

    return <span className={styles.root}>{counter.toLocaleString()}</span>;
  }
}
