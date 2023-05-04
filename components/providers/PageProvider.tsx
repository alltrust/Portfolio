import React from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider as PreferredThemeProvider } from 'next-themes';
import createEmotionCache from '../../lib/createEmotionCache';
import MUIThemeProvider from './MUIThemeProvider';
import MainHead from '../head';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface PageProviderProps {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
}

const PageProvider = ({
  children,
  emotionCache = clientSideEmotionCache,
}: PageProviderProps) => (
  <PreferredThemeProvider>
    <CacheProvider value={emotionCache}>
      <MainHead />
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </CacheProvider>
  </PreferredThemeProvider>
);

export default PageProvider;
