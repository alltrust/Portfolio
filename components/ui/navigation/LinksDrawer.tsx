import useAppContext from '../../../hooks/useAppContext';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import { navLinks } from '../../../utils/navLinks';
import SkillSet from '../skill-set';

const LinksDrawer = () => {

  const { state, dispatch, stateFns } = useAppContext();

  const {handleModalOpen} = stateFns

  const handleDrawerToggle = () => {
    dispatch({ type: 'TOGGLE_DRAWER', payload: !state.toggleDrawer });
  };

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={state.toggleDrawer}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { sm: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '240px' },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Aldo | Garcia
          </Typography>
          <Divider />
          <List>
            {navLinks.map((navLink, idx) => {
              const { name, link } = navLink;
              const Component = link ? NextLink : 'button';
              const componentProps = link ? { href: link } : {};
              return (
                <ListItem key={idx} disablePadding>
                  <ListItemButton
                    LinkComponent={Component}
                    {...componentProps}
                    sx={{ textAlign: 'center' }}
                    onClick={name === 'Contact' ? handleModalOpen : undefined}
                  >
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <SkillSet/>
      </Drawer>
    </Box>
  );
};

export default LinksDrawer;
