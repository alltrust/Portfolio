import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/react';

import PageProvider from '../components/providers/PageProvider';
import Layout from '../components/layout/Layout';

export interface IAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: IAppProps) {
  const { Component, emotionCache, pageProps } = props;

  return (
    <PageProvider emotionCache={emotionCache}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PageProvider>
  );
}

export default MyApp;
