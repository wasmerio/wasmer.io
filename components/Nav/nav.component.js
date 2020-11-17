import React, { Component } from 'react';
import { GithubBadge } from '../GithubBadge/github-badge.component';
import { LogoLink } from './LogoLink/logo-link.component';
import { MenuItemsComponent } from './MenuItems/menu-items.component';
import { MobileMenu } from './MobileMenu/mobile-menu.component';
import links from './nav.constants.js';
import styles from './nav.module.css';

export class NavComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpened: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    const { menuOpened } = this.state;
    this.setState({ menuOpened: !menuOpened });
  }

  render() {
    const { menuOpened } = this.state;
    return (
      <nav className={styles.root}>
        <ul className="flex font-semibold justify-between items-center pt-6 p-8">
          <LogoLink />
          <ul
            className={`justify-between items-center space-x-8 tracking-wide text-primary ${styles.navBar}`}
          >
            <MenuItemsComponent
              links={links.filter((link) => !link.hideOnMain)}
            />
            <GithubBadge />
          </ul>
          <div className={styles.mobileMenuContainer}>
            <button
              className={styles.navToggle}
              onClick={this.toggleMenu}
              aria-label="Close mobile menu"
            >
              <img src="images/mobile_menu.svg" width="26px" height="25px" />
            </button>
            {menuOpened ? (
              <MobileMenu toggleMenu={() => this.toggleMenu()} links={links} />
            ) : (
              ''
            )}
          </div>
        </ul>
      </nav>
    );
  }
}
