import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../../layout/Logo';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MuiSwitch from '../mui-switch';
import Slide from '@mui/material/Slide';
import { useTheme } from 'next-themes';
import Box from '@mui/material/Box';
import NavTabs from './NavTabs';
import useAppContext from '../../../hooks/useAppContext';
import ContactForm from '../../contact-form';
import Portal from '../modal/Portal';
import Modal from '../modal';

const StyledToolbar = styled(Toolbar)({
  width: '100%',
  justifyContent: 'space-between',
  minHeight: '0px',
});

const HideAppBar = () => {
  const { state } = useAppContext();
  const { showModal } = state;

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
                : 'rgba(227, 237, 241, 0.9)',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <StyledToolbar>
            <Box
              sx={{
                marginRight: '3rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Logo />
              <MuiSwitch onClick={toggleDarkMode} />
            </Box>
            <NavTabs />
          </StyledToolbar>
        </AppBar>
      </Slide>
      <Toolbar />
      {showModal ? (
        <Portal>
          <Modal>
            <ContactForm />
          </Modal>
        </Portal>
      ) : null}
    </>
  );
};
export default HideAppBar;
