import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MuiSwitch from '../MuiSwitch';
import Slide from '@mui/material/Slide';
import { useTheme } from 'next-themes';
import { Box, Theme } from '@mui/material';
import NavTabs from './NavTabs';

const NavBarStyles = (theme: Theme) => ({
  display: 'flex',
  alignItems: 'baseline',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
});

const HideAppBar = () => {
  const defaultStyle = css`
    min-height: 162.38px;
  `;

  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const trigger = useScrollTrigger();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div css={defaultStyle}></div>;

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar
          sx={{
            backgroundColor:
              theme === 'dark'
                ? 'rgba(0, 0, 49,0.9)'
                : 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Toolbar>
            <Box sx={NavBarStyles}>
              <Box sx={{ marginRight: '3rem' }}>
                <Typography
                  sx={{ color: (theme) => theme.palette.text.primary }}
                  variant="body2"
                  component="p"
                >
                  Aldo Garcia
                </Typography>
                <MuiSwitch onClick={toggleDarkMode} />
              </Box>
              <Box>
                <NavTabs />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
};
export default HideAppBar;
