import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import MainAvatar from '@site/src/components/Avatar';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        {/* <h1 className="hero__title">{siteConfig.title}</h1> */}
        <h1 className="hero__title"><MainAvatar></MainAvatar></h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <div >
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/homework/intro">
              平时作业 5min ⏱️
            </Link>

            <span>&nbsp;&nbsp;</span>
            <Link
              className="button button--secondary button--lg"
              to="/docs/review/intro">
              期末突击 5min ⏱️
            </Link>
          </div>
        </div>


      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
