import React from "react";
import Link from "next/link";
import Logo from "../images/logo.svg";

import GithubLogo from "../images/github-logo.svg";

import css from "./nav.css";

const Nav = () => (
  <nav className={css.header}>
    <div className={css.container}>
      <Link href="/">
        <a className={css.logo}>
          <img src={Logo} />
        </a>
      </Link>
      <ul className={css.headerLinks}>
        <li>
          <a href="https://docs.wasmer.io/">Docs</a>
        </li>
        <li>
          <a href="https://wapm.io">WAPM</a>
        </li>
        <li>
          <a href="https://spectrum.chat/wasmer">Community</a>
        </li>
        <li>
          <a href="https://medium.com/wasmer">Blog</a>
        </li>
        <li className={css.github}>
          <a href="https://github.com/wasmerio/wasmer">
            <span className={css.githubAction}><img src={GithubLogo} />
            Star</span>
            <span className={css.githubStars}>
              5,340
            </span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;
