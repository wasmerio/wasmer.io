import React, { Component } from 'react';
import styles from './github-counter.module.css';

export class GithubCounterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 6122,
      animate: props['animate'],
      update: false,
    };
  }

  getCounter = async () => {
    if (!process.env.GITHUB_API_ACTIVE) return 6524;
    const resource = await fetch(
      'https://api.github.com/repos/wasmerio/wasmer',
    );
    const data = await resource.json();
    return data.stargazers_count;
  };

  componentDidMount() {
    this.getCounter().then((counter) => {
      counter = counter.toLocaleString();
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
          {counter.slice(0, -1)}
          <span
            className={`${styles.animation} ${update ? styles.update : ''}`}
          >
            <span className={styles.animationContainer}>
              <span>{(counter - 1).slice(-1)}</span>
              <span>{counter.slice(-1)}</span>
            </span>
          </span>
        </span>
      );
    }

    return <span className={styles.root}>{counter}</span>;
  }
}
