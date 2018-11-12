import React from 'react'
import { Link } from 'gatsby'
import styles from './index.module.css'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <div className="container">
      <h1 className={styles.slogan}>
        A new era has just begun.
        <br />
        <u>Universal Binaries</u> powered by WebAssembly.
      </h1>
    </div>
    <div className={styles.instructionSet}>
      <div className={styles.instruction} data-item="1">
        <div className={styles.instruction__inner}>
          <h3>Install Wasmer</h3>
          <code>curl https://get.wasmer.io -sSf | sh</code>
        </div>
      </div>
      <div className={styles.instruction} data-item="2">
        <div className={styles.instruction__inner}>
          <h3>Run WebAssembly Files</h3>
          <code>wasmer run nginx.wasm</code>
        </div>
      </div>
      <div className={styles.instruction} data-item="3">
        <div className={styles.instruction__inner}>
          <h3>Enjoy</h3>
          <code>
            Running Nginx on localhost:8080
            <br />
            Press Ctrl-C to stop...
          </code>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
