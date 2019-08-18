import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/footer";

import css from "./coming-soon.css";

const ComingSoon = () => (
  <div>
    <Head>
      <title>Wasmer - Coming Soon</title>
    </Head>
    <Nav />
    <div className={css.hero}>Coming soon...</div>
    <Footer />
  </div>
);

export default ComingSoon;
