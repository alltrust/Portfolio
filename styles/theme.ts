import { grey } from '@mui/material/colors';
import { PaletteOptions, createTheme, css } from '@mui/material/styles';

export type AllowedTheme = NonNullable<PaletteOptions['mode']>;

export const DEFAULT_THEME: AllowedTheme = 'dark';

const commonCore = {
  typography: {
    fontFamily: 'Robot Mono, monospace',
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
};

export const lightTheme = createTheme({
  ...commonCore,
  palette: {
    primary: { main: '#a981e5', light: '#362352' },
    secondary: { main: '#edf2f4', dark: '#8541eb', contrastText: '#a981e5' },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  ...commonCore,
  palette: {
    primary: { main: '#46ee9a', light: '#effbf7' },
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
