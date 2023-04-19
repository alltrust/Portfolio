import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {

  return(
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="Aldo's personal portfolio. See my on my fullstack journy. " />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );

}

export default MyApp;
