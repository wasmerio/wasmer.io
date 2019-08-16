import React from "react";
import Link from "next/link";
import Logo from "../images/logo-white.svg";

import css from "./footer.css";
import grid from "./grid.css";

const Footer = () => (
  <footer className={css.footer}>
    <div className={`${grid.grid} ${grid.gridWhite} ${css.footerGrid}`} />
    <div className={css.container}>
      <div className={css.companyInfo}>
        <img src={Logo} />
        <div className={css.mission}>
          Making software universally accessible
        </div>
      </div>
      <div class={css.nav}>
        <ul>
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
          <li className={css.github}>
            <a href="https://github.com/wasmerio/wasmer">Github</a>
          </li>
          <li className={css.twitter}>
            <a href="https://twitter.com/wasmerio">Twitter</a>
          </li>
        </ul>
        <div className={css.copyright}>© 2019 Wasmer, Inc.</div>
      </div>
    </div>
  </footer>
);

export default Footer;
