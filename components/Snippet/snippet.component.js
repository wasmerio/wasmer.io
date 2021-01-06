import React, { Component } from 'react';
import classnames from 'classnames';
import copy from 'copy-to-clipboard';
import styles from './snippet.module.css';

const INSTALL_COMMAND_LINUX = "curl https://get.wasmer.io -sSfL | sh";
const INSTALL_COMMAND_WINDOWS = "iwr https://win.wasmer.io -useb | iex";

export class SnippetComponent extends Component {
  state = {
    copied: false,
    installCommand: INSTALL_COMMAND_LINUX,
  };

  componentDidMount() {
    let platform = process.browser && window && window.navigator && window.navigator.platform;
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    if (windowsPlatforms.indexOf(platform) !== -1) {
      this.setState({ installCommand: INSTALL_COMMAND_WINDOWS });
    }
  }

  onClick() {
    this.setState({ copied: true });
    copy(this.state.installCommand);
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
    const { variant, fadeOut } = this.props;

    return (
      <div
        className={classnames({
          [styles.container]: true,
          [styles.dark]: variant && variant === 'dark',
          [styles.fadeOut]: fadeOut,
        })}
      >
        <div
          className={styles.snippet}
          onClick={() => this.onClick()}
          onMouseOut={() => this.onMouseOut()}
        >
          <pre>{this.state.installCommand}</pre>
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
