import React from 'react'
import WasmerLogo from '../images/wasmer-logo.png'
import styles from './header.module.css'

const Header = ({ siteTitle }) => (
  <div className="container">
    <div className={styles.header}>
      <img src={WasmerLogo} style={{ width: 200, height: 55 }} />
    </div>
  </div>
)

export default Header
