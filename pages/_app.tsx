import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/react';

import PageProvider from '../components/providers/PageProvider';
import HideAppBar from '../components/ui/NavigationAppBar/HideAppBar';

//try creating a HEAD component with attributes

interface IAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: IAppProps) {
  const { Component, emotionCache, pageProps } = props;

  return (
    <PageProvider emotionCache={emotionCache}>
      <HideAppBar />
      <Component {...pageProps} />
    </PageProvider>
  );
}

export default MyApp;
