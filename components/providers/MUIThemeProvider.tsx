import { ReactNode, useEffect, useState } from 'react';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { useTheme } from 'next-themes';
import { darkTheme, lightTheme, globalStyles } from '../../styles/theme';

interface PageProviderProps {
  children: ReactNode;
}
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
      <CssBaseline/>
      <GlobalStyles styles={globalStyles}/>
      {children}
    </ThemeProvider>
  );

};
export default MUIThemeProvider;

