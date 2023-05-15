import { MouseEventHandler, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NextLink from 'next/link';
import useAppContext from '../../../hooks/useAppContext';
import { navLinks } from '../../../utils/navLinks';
import { splitPathname } from '../../../utils/splitPathname';

const NavTabs = () => {
  const { state, dispatch } = useAppContext();
  //perhaps i can pass via SSR and set the state.pathname early
  const { navPathname, navTabClicked } = state;
  const router = useRouter();

  const pathname = splitPathname(router);

  const handleModalOn: MouseEventHandler<HTMLDivElement> = () => {
    dispatch({ type: 'SHOW_MODAL', payload: true });
  };

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
      <Tabs value={state.navPathname} onChange={handleTabChange}>
        {navLinks.map((navlink, idx) => {
          const { value, name, link } = navlink;
          const Component = link ? NextLink : 'button';
          const componentProps = link ? { href: link } : {};
          return (
            <Tab
              key={idx}
              value={value || name.toLowerCase()}
              label={name}
              LinkComponent={Component}
              {...componentProps}
              onClick={name === 'Contact' ? handleModalOn : undefined}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default NavTabs;
