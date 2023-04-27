import { useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NextLink from 'next/link';
import useAppContext from '../../../hooks/useAppContext';
import { navLinks } from '../../../utils/navLinks';

const NavTabs = () => {
  const { state, dispatch } = useAppContext();

  const router = useRouter();
  const pathname = router.pathname;
  const splitPath = pathname.split('/');
  console.log(splitPath[1]);
  
  // const [value, setValue] = useState(splitPath[1]);

  const handleTabChange = (el: React.SyntheticEvent, newValue: string) => {
    const pathname = router.pathname;
    const splitPath = pathname.split('/');
    dispatch({ type: 'FOCUS_NAVLINK_PATH', payload: newValue || splitPath[1] || "home"});
    // setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={state.navPathname} onChange={handleTabChange}>
        {navLinks.map((navlink, idx) => {
          return (
            <Tab
              key={idx}
              value={navlink.name.toLowerCase()}
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
