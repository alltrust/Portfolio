import { createTheme } from '@mui/material/styles';

const coreTheme = {
  typography: {
    fontFamily: '\'Roboto\', sans-serif',
  },
  // Add more properties here as our app grows
};

const theme = createTheme({
  ...coreTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#09015F',
    },
    secondary: {
      main: '#F06292',
    },
  },
  components: {
    // Customize specific components
  },
  // Other theme options
});

const lightTheme = createTheme({
  ...createTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#007AFF',
    },
    secondary: {
      main: '#FF3B30',
    },
  },
  components: {
    // Customize specific components
  },
  // Other theme options
});

// Override theme for dark mode

export { theme, lightTheme };
