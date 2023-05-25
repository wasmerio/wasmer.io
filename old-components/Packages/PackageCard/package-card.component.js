import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './package-card.module.css';

export class PackageCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: props.highlighted,
      action: props.action,
      index: props.index,
      name: props.name,
      description: props.description,
      username: props.username,
      version: props.version,
      highlightedIndex: props.highlightedIndex,
    };
  }

  render() {
    return (
      <li
        key={this.state.name}
        className={classnames({
          [styles.highlighted]:
            this.state.index === this.state.highlightedIndex,
          [styles.animatedHighlighted]:
            this.state.index === this.state.highlightedIndex &&
            this.state.action === 'install',
        })}
      >
        <h3>
          {this.state.index === this.state.highlightedIndex &&
          this.state.action === 'publish'
            ? 'Your Package'
            : this.state.name}
        </h3>
        <div className="text-small">{this.state.description}</div>
        <div className={`${styles.note} text-note`}>
          {this.state.version} • {this.state.username}
        </div>
      </li>
    );
  }
}
