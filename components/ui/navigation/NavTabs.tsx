import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NextLink from 'next/link';
import useAppContext from '../../../hooks/useAppContext';
import { navLinks } from '../../../utils/navLinks';
import { splitPathname } from '../../../utils/splitPathname';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';
import LinksDrawer from './LinksDrawer';

const StyledNavLinksBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const NavTabs = () => {
  const { state, dispatch, stateFns } = useAppContext();
  const { navPathname, navTabClicked } = state;
  const { handleModalOpen, handleToggleDrawer } = stateFns;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  //perhaps i can pass via SSR and set the state.pathname early
  const router = useRouter();
  const pathname = splitPathname(router);

  useEffect(() => {
    if (!navTabClicked) {
      dispatch({ type: 'FOCUS_NAVLINK_PATH', payload: pathname });
    }
  }, [dispatch, pathname, navPathname, navTabClicked]);

  const handleTabChange = (el: React.SyntheticEvent, newValue: string) => {
    dispatch({ type: 'FOCUS_NAVLINK_PATH', payload: newValue || 'home' });
    dispatch({ type: 'NAV_TAB_CLICKED', payload: true });
  };

  return (
    <Box>
      <StyledNavLinksBox>
        <Tabs value={navPathname} onChange={handleTabChange}>
          {navLinks.map((navlink, idx) => {
            const { value, name, link } = navlink;
            const Component = link ? NextLink : 'button';
            const componentProps = link ? { href: link } : {};
            const lowerCasedName = name.toLowerCase();

            return (
              <Tab
                key={idx}
                value={value || lowerCasedName}
                label={name}
                LinkComponent={Component}
                {...componentProps}
                onClick={name === 'Contact' ? handleModalOpen : undefined}
              />
            );
          })}
        </Tabs>
      </StyledNavLinksBox>

      {isMobile ? (
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleToggleDrawer}
        >
          <MenuIcon />
        </IconButton>
      ) : null}

      <LinksDrawer />
    </Box>
  );
};

export default NavTabs;
