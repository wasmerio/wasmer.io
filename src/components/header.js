import React from 'react'
import WasmerLogo from '../images/wasmer-logo.png'
import styles from './header.module.css'
import { FaGithub, FaTwitter, FaComments, FaPencilAlt } from 'react-icons/fa'

const Header = ({ siteTitle }) => (
  <div className="container">
    <div className={styles.header}>
      <a href="https://wasmer.io/" className={styles.logo}>
        <img src={WasmerLogo} style={{ width: 200, height: 55 }} />
      </a>
      <div className={styles.navbar}>
        <a href="https://spectrum.chat/wasmer" className={styles.twitter}>
          <FaComments className={styles.twitterIcon} />
          Community
        </a>
        <a href="https://medium.com/wasmer" className={styles.twitter}>
          <FaPencilAlt className={styles.twitterIcon} />
          Blog
        </a>
        <a href="https://twitter.com/wasmerio" className={styles.twitter}>
          <FaTwitter className={styles.twitterIcon} />
          Twitter
        </a>
        <a
          href="https://github.com/WAFoundation/wasmer"
          className={styles.github}
        >
          <FaGithub className={styles.githubIcon} />
          Github
        </a>
      </div>
    </div>
  </div>
)

export default Header
