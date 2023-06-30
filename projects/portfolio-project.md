---
title: 'Next Portfolio'
dateCreated: '2023-05-01'
image: 'portfolio_project_square.PNG'
summary: They say don't make your own engineering portfolio, but rather use a template... so I made a portolio - for you! Built with Next.js and Material-ui. 
subHeading: 'Explore this Nextjs Portfolio'
author: 'Aldo Garcia'
isFeatured: false
stack: ['Nextjs', 'Mui', 'MongoDB', 'Vercel', 'Jest', 'Rtl']
---

### Why this Portfolio?

They say don't make your own engineering portfolio, but rather use a template... so I made a portolio - for you! Not only can you follow me and my development jouney, but also have several articles available at your disposal.

This portfolio is open source and can be accessed by anybody ((GITLINK)). Using Next.js & Material-UI with emotion engine, this portolio is for both viewing and learning.

### Getting Started with NEXT.js & MUI

Before we dive into using Next.js with MUI ( via emotion engine)- let's understand what Next.Js does under the hood for us, so we can better understand why this set-up process is a bit more complicated.

Next.js offers **SSR**, **SSG**, & **ISR**. These are page rendering methods that allow us to render pages on the server, at build time, or in increments. This leads to pages with faster load times and having better SEO performance.

This capability by Next.js does raise a particular problem when using MUI for styling. If the pages are pre-generated or rendered on the server-side, how can the CSS also be pre-rendered or generated if it is on the client-side?

The answer is that the CSS can also be pre-rendered or generated during the SSR process, through techniques like **CSS-in-JS**. By providing a way to dynamically manage the CSS at runtime, the critical CSS styles are injected into the server-side HTML and, therefore, are pre-rendered. How is this done? ... Enter Emotion.

```js
//_document.tsx
export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        {/* Inject MUI styles first to match with the prepend: true configuration. */}
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <div id="portal" />
        <NextScript />
      </body>
    </Html>
  );
}
...
```

```js
// _document.tsx
...
MyDocument.getInitialProps = async (ctx:DocumentContext) => {

  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
```

#### Emotion setup

Emotion does a few things for us so that we can pre-render the CSS styles for our Nextjs application.

1. Emotion Cache and Emotion server- Creates a cache instance to store CSS styles and a server instance which provides us with `extractCriticalToChunks()` which, as the name implies, extracts the critical CSS styles during SSR.

```js
// _document.tsx
...

MyDocument.getInitialProps = async (ctx) => {

  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

...
};

// createEmotionCache.ts DONT FORGET TO EXPLAIN THE CSS AND PREPEND
import createCache from '@emotion/cache';

const createEmotionCache = ()=>{
  return createCache({ key: 'css', prepend:true });
};

export default createEmotionCache;
```

2. Overides renderPage method - NextJs `getInitialProps()` overrides the `renderPage` method by keeping the original behaviors of the method and _enhancing_ it with with the Emotion cache as props.

```js
//_document.tsx
...

MyDocument.getInitialProps = async (ctx) => {

  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
...
};
```

3. Generation and injection of style tags - When initial props are recieved, the extracted critical CSS is converted into style tags which are then injected into the Next.js <Head> component.

```js

//document.tsx
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            as="style"
          />
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {

...
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
```

### Alternating Light and Dark Theme Modes 

A feature several apps want their users to take advantage of is the switch between light and dark modes. 

We have our `_document.tsx` file ready, now we need to service them to our `_app.tsx`. We will put these in separate components rather than crowding out `_app.tsx` file.

```js
//MUIThemeProvider.tsx
import { ReactNode, useEffect, useState } from 'react';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { useTheme } from 'next-themes';
import { darkTheme, lightTheme, globalStyles } from '../../styles/theme';

const MUIThemeProvider = ({ children }: PageProviderProps) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  useEffect(() => {
    resolvedTheme === 'light'
      ? setCurrentTheme(lightTheme)
      : setCurrentTheme(darkTheme);
  }, [resolvedTheme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      {children}
    </ThemeProvider>
  );
};
```

The **resolvedTheme** is destructured from `useTheme()`, from a 3rd party package[next-themes](https://www.npmjs.com/package/next-themes). This allows us to create a theme, via `createTheme()`
function provided by Material-Ui library. With the `useEffect()` and `useState()` hooks provided by React, everytime the `resolvedTheme` changes, we set the current theme to the corresponding mode, either 'dark' or 'light'.

The `globalStyles` and `CSSBaseline` help with setting a baselines consistent theme to build on throughout our app.

```js
//theme.ts

export const lightTheme = createTheme({
  palette: {
    primary: { main: '#a981e5' },
    secondary: { main: '#edf2f4', dark: '#8541eb', contrastText: '#a981e5' },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: { main: '#46ee9a' },
    secondary: {
      main: '#090928',
      dark: '#46ee9a',
      contrastText: '#87cbcb',
    },
    text: {
      primary: grey[500],
      secondary: grey[400],
    },
    mode: 'dark',
  },
});

export const globalStyles = css`
  :root {
    body {
      background-color: #edf2f4;
      color: #121212;
    }
  }
  [data-theme='dark'] {
    body {
      background-color: #090928;
      color: #fff;
    }
  }
`;
```

Next we create client side emotion Cache so that the CSS-in-JS is stored throughout the session of the user in the browser. This is passed as a prop to our `cacheProvider` and wrapped around the MUIAThemeProvider. 


```js
//PageProvider.tsx
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider as PreferredThemeProvider } from 'next-themes';
import createEmotionCache from '../../lib/createEmotionCache';
import MUIThemeProvider from './MUIThemeProvider';

const clientSideEmotionCache = createEmotionCache();


const PageProvider = ({
  children,
  emotionCache = clientSideEmotionCache,
}: PageProviderProps) => (
  <PreferredThemeProvider>
    <CacheProvider value={emotionCache}>
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </CacheProvider>
  </PreferredThemeProvider>
);
```

Before we used the Emotion cache to ensure that CSS-in-JS styles were rendered on the server side, but in this component we use it to for client-side rendering. 

#### New features coming soon

This portfolio will soon include a _skeleton_ view which will allow users interact with the site to dig up the sites' bare-bones code. For example, do you see a particular feature or component you like and perhaps would like to use it? Just toggle that ((SHOW IMAGER HERE)) button and a quick view of the code will display on your screen so you don't have to open another github link and contemplate whether you have a tab hoarding problem again.


