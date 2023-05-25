import clsx from "clsx";
import React from "react";

import { Transition } from "@headlessui/react";

import { GithubBadge } from "../GithubBadge/github-badge.component";
import { LogoLink } from "./LogoLink/logo-link.component";
import { MenuItemsComponent } from "./MenuItems/menu-items.component";
import { MobileMenu } from "./MobileMenu/mobile-menu.component";
import links from "./nav.constants.js";
import styles from "./nav.module.css";

export const NavComponent = (props) => {
  const [menuOpened, setMenuOpened] = React.useState(false);

  function toggleMenu() {
    setMenuOpened(!menuOpened);
  }

  return (
    <nav className={clsx(styles.root, "transition-all duration-[5000ms]")}>
      <ul className="flex font-semibold justify-between items-center pt-6 p-8">
        <LogoLink />
        <ul
          className={clsx(
            "justify-between items-center space-x-8 tracking-wide text-primary",
            styles.navBar
          )}
        >
          <MenuItemsComponent
            links={links.filter((link) => !link.hideOnMain)}
          />
          <GithubBadge />
        </ul>
        <div className={styles.mobileMenuContainer}>
          <button
            className={styles.navToggle}
            onClick={toggleMenu}
            aria-label="Close mobile menu"
          >
            <img src="/images/mobile_menu.svg" width="26px" height="25px" />
          </button>
          <Transition
            // className="opac"
            show={menuOpened}
            enter="transition-all ease-linear duration-500"
            enterFrom="opacity-0 left-[1000px]"
            enterTo="opacity-100 left-0"
            leave="transition-all duration-700"
            leaveFrom="opacity-100 left-0"
            leaveTo="opacity-0 left-[1000px]"
          >
            <MobileMenu toggleMenu={toggleMenu} links={links} />
          </Transition>
        </div>
      </ul>
    </nav>
  );
};
