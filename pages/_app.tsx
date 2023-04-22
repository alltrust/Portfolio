import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/react';

import PageProvider from '../components/providers/PageProvider';

//try creating a HEAD component with attributes

interface IAppProps extends AppProps{
  emotionCache?: EmotionCache
}

function MyApp(props: IAppProps) {

  const { Component, emotionCache, pageProps } = props;

  return(
    <PageProvider emotionCache={emotionCache}>
      <Component {...pageProps} />
    </PageProvider>
  );

}

export default MyApp;
