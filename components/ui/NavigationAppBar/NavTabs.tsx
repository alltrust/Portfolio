import { useState } from 'react';
import { navLinks } from '../../../utils/navLinks';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const NavTabs = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const splitPath = pathname.split('/');

  const [value, setValue] = useState(splitPath[1]);

  const handleTabChange = (el: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleTabChange}>
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
