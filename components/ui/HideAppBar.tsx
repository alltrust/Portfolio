import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Switch from '@mui/material/Switch';
import Slide from '@mui/material/Slide';
import { useTheme } from 'next-themes';

const HideAppBar = () => {
  const defaultStyle = css`
    min-height: 162.38px;
  `;

  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const trigger = useScrollTrigger();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div
        css={defaultStyle}
      ></div>
    );

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              {theme}
            </Typography>
            <Switch onClick={toggleDarkMode} />
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
};
export default HideAppBar;
