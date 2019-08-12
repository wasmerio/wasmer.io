import React from "react";
import Link from "next/link";
import Logo from "../images/logo-white.svg";

import css from "./footer.css";
import grid from "./grid.css";

const Footer = () => (
  <footer className={css.footer}>
    <div className={grid.grid} />
    <div className={css.container}>
      <div className={css.companyInfo}>
        <img src={Logo} />
        <div className={css.mission}>
          Making software universally accessible since 2019
        </div>
      </div>
      <ul class={css.nav}>
        <li>
          <a href="https://wapm.io">WAPM</a>
        </li>
        <li>
          <a href="https://spectrum.chat/wasmer">Community</a>
        </li>
        <li>
          <a href="https://medium.com/wasmer">Blog</a>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
