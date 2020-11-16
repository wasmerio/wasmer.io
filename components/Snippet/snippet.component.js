import React, { Component } from 'react';
import classnames from 'classnames';
import copy from 'copy-to-clipboard';
import styles from './snippet.module.css';

export class SnippetComponent extends Component {
  state = {
    copied: false,
  };

  installCommand = 'curl https://get.wasmer.io -sSfL | sh';

  onClick() {
    this.setState({ copied: true });
    copy(this.installCommand);
  }

  onMouseOut() {
    if (this.state.copied) {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 200);
    }
  }

  render() {
    const { copied } = this.state;
    const { variant } = this.props;

    return (
      <div
        className={classnames({
          [styles.container]: true,
          [styles.dark]: variant && variant === 'dark',
        })}
      >
        <div
          className={styles.snippet}
          onClick={() => this.onClick()}
          onMouseOut={() => this.onMouseOut()}
        >
          <pre>{this.installCommand}</pre>
        </div>
        <span
          className={classnames({
            [styles.copy]: true,
            [styles.copied]: copied,
          })}
        >
          {copied ? 'Copied' : 'Copy'}
        </span>
      </div>
    );
  }
}
