import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './packages.module.css';
import packages from './packages.constants';
import { LinkComponent } from '../Link/link.component';
import { getScreenType, shuffle } from '../../utils';

export class PackagesComponent extends Component {
  interval = 2500; //shuffle interval (ms)
  highlightIndex = {
    xs: 0,
    sm: 0,
    md: 2,
    lg: 2,
    xl: 3,
  }; //which element should be highlighted

  constructor(props) {
    super(props);
    this.state = {
      items: packages,
      screen: 'lg',
      action: props.action ? props.action : 'install',
      headline:
        props.action && props.action === 'publish' ? (
          <>
            Publish your package on <strong>WAPM</strong>, the WebAssembly
            Package Manager.
          </>
        ) : (
          <>
            Pre-installed:
            <br />
            <strong>WAPM</strong>, the WebAssembly Package Manager.
          </>
        ),
      linkText:
        props.action && props.action === 'publish'
          ? 'Publish on wapm.io'
          : 'See all packages on wapm.io',
      linkHref:
        props.action && props.action === 'publish'
          ? 'https://docs.wasmer.io/ecosystem/wapm/publishing-your-package'
          : 'https://wapm.io',
    };

    this.setScreen = this.setScreen.bind(this);
  }

  componentDidMount() {
    const { items } = this.state;
    setInterval(() => {
      shuffle(items);
      this.setState({ items });
    }, this.interval);
    this.setScreen();
    window.addEventListener('resize', this.setScreen, { passive: true });
  }

  setScreen() {
    let screen = getScreenType(window);
    // attention: special handling!
    if (window.innerWidth > 1414) {
      screen = 'xl';
    }
    this.setState({ screen });
  }

  getHighlightIndex() {
    const { screen } = this.state;
    return this.highlightIndex[screen];
  }

  render() {
    const { variant } = this.props;
    const { items } = this.state;
    let currentPackageName = items[this.getHighlightIndex()].name;

    const ownPackageDescription =
      'Contribute your own package. Push WebAssembly above and beyond.';

    const color = variant === 'dark' ? 'primary' : 'secondary';
    return (
      <div
        className={`bg-${color} text-white relative overflow-hidden py-page my-page`}
      >
        <div className="container">
          <h2 className="md:w-2/3 mb-12">{this.state.headline}</h2>
          <pre className={styles.command}>
            wapm {this.state.action}{' '}
            {this.state.action === 'publish'
              ? 'your-package'
              : currentPackageName}
          </pre>
        </div>

        <div className={styles.microContainer}>
          <div className="container">
            <LinkComponent
              inverted
              target="_blank"
              href={this.state.linkHref}
              linkText={this.state.linkText}
            />
          </div>

          <div className={styles.packages}>
            {items.map(({ name, description, version, username }, index) => {
              return (
                <div
                  key={index + name}
                  className={classnames({
                    [styles.highlighted]: index === this.getHighlightIndex(),
                    [styles.animatedHighlighted]:
                      index === this.getHighlightIndex() &&
                      this.state.action === 'install',
                  })}
                >
                  <h3>
                    {index === this.getHighlightIndex() &&
                    this.state.action === 'publish'
                      ? 'Your Package'
                      : name}
                  </h3>
                  <div className="text-small">
                    {index === this.getHighlightIndex() &&
                    this.state.action === 'publish'
                      ? ownPackageDescription
                      : description}
                  </div>
                  <div className={`${styles.note} text-note`}>
                    {index === this.getHighlightIndex() &&
                    this.state.action === 'publish'
                      ? '1.0'
                      : version}{' '}
                    •{' '}
                    {index === this.getHighlightIndex() &&
                    this.state.action === 'publish'
                      ? 'your-handle'
                      : username}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
