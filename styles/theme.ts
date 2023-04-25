import { grey } from '@mui/material/colors';
import { PaletteOptions, createTheme, css } from '@mui/material/styles';

export type AllowedTheme = NonNullable<PaletteOptions['mode']>;

export const DEFAULT_THEME: AllowedTheme = 'dark';

export const lightTheme = createTheme({
  palette: {
    primary: { main: '#9147FF' },
    secondary: { main: '#2a48f3' },
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
    secondary: { main: '#2a48f3' },
    text: {
      primary: grey[200],
      secondary: grey[400],
    },
    mode: 'dark',
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
