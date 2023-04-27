import { grey } from '@mui/material/colors';
import { PaletteOptions, createTheme, css } from '@mui/material/styles';

export type AllowedTheme = NonNullable<PaletteOptions['mode']>;

export const DEFAULT_THEME: AllowedTheme = 'dark';


// const commonCore = {
//   spacing: {
//     xs: 4,
//     sm: 8,
//     md: 16,
//     lg: 24,
//     xl: 32,
//   },
//   margins: {
//     xs: 4,
//     sm: 8,
//     md: 16,
//     lg: 24,
//     xl: 32,
//   },
// };

export const lightTheme = createTheme({
  palette: {
    primary: { main: '#9147FF' },
    secondary: { main: '#2a48f3' },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
    mode: 'light',
    // common: commonCore
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: { main: '#46ee9a' },
    secondary: { main: '#2a48f3' },
    text: {
      primary: grey[200],
      secondary: grey[400],
    },
    mode: 'dark',
    // common: commonCore
  },
});

export const globalStyles = css`
  :root {
    body {
      background-color: #fff;
      color: #121212;
    }
  }
  [data-theme='dark'] {
    body {
      background-color: #000031;
      color: #fff;
    }
  }
`;
