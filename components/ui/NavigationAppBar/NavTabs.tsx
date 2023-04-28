import { useEffect } from 'react';
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
  const router = useRouter();

  const pathname = splitPathname(router);

  useEffect(() => {
    if (!state.navTabClicked) {
      dispatch({ type: 'FOCUS_NAVLINK_PATH', payload: pathname });
    }
  }, [dispatch, pathname, state.navPathname, state.navTabClicked]);

  const handleTabChange = (el: React.SyntheticEvent, newValue: string) => {
    dispatch({ type: 'FOCUS_NAVLINK_PATH', payload: newValue || 'home' });
    dispatch({ type: 'NAV_TAB_CLICKED', payload: true });
  };

  return (
    <Box>
      <Tabs value={state.navPathname} onChange={handleTabChange}>
        {navLinks.map((navlink, idx) => {
          return (
            <Tab
              key={idx}
              value={navlink.value || navlink.name.toLowerCase()}
              label={navlink.name}
              href={navlink.link}
              LinkComponent={NextLink}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default NavTabs;
