import React from 'react'
import { Link } from 'gatsby'
import styles from './index.module.css'

import Layout from '../components/layout'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const IndexPage = () => (
  <Layout>
    <div className="container">
      <h1 className={styles.slogan}>
        Build Once, Run Anywhere.
        <br />
        <u>Universal Binaries</u> powered by WebAssembly
      </h1>
    </div>
    <div className={styles.instructionSet}>
      <div className={styles.instruction} data-item="1">
        <div className={styles.instruction__inner}>
          <h3>Install Wasmer</h3>
          <CopyToClipboard text="curl https://get.wasmer.io -sSfL | sh">
            <code>curl https://get.wasmer.io -sSfL | sh</code>
          </CopyToClipboard>
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
