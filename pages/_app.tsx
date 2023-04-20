import React, { useMemo } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme, lightTheme } from '../styles/theme';
import createEmotionCache from '../lib/createEmotionCache';
import HideAppBar from '../components/ui/HideAppBar';

//try creating a HEAD component with attributes

const clientSideEmotionCache = createEmotionCache();

interface IAppProps extends AppProps{
  emotionCache?: EmotionCache
}

function MyApp(props: IAppProps) {

  const { Component, emotionCache= clientSideEmotionCache, pageProps } = props;

  return(
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="Aldos personal portfolio. See my on my fullstack journey. " />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <HideAppBar>
          <Component {...pageProps} />
        </HideAppBar>
      </ThemeProvider>
    </CacheProvider>
  );

}

export default MyApp;
