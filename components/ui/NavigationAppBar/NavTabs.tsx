import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const NavTabs = () => {
  const [value, setValue] = useState('home');

  const handleTabChange = (el: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
      <Box>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab value="home" label="Home" />
          <Tab value="about" label="About" />
          <Tab value="projects" label="Projects" />
          <Tab value="contact" label="Contact" />
          <Tab value="resume" label="resume" />
        </Tabs>
      </Box>
  );
};

export default NavTabs;
