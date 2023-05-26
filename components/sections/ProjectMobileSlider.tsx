import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from '@mui/material';

interface IProjectMobileSlider {
  firstComponent: React.ReactNode;
  secondComponent: React.ReactNode;
}

const ProjectMobileSlider = ({
  firstComponent,
  secondComponent,
}: IProjectMobileSlider) => {
  const theme = useTheme();

  const initialComponentValues = { isFirstOpen: true, isSecondOpen: false };
  const [openComponent, setOpenComponent] = useState(initialComponentValues);

  const toggleComponentCollapse = () => {
    setOpenComponent((prevState) => ({
      isFirstOpen: !prevState.isFirstOpen,
      isSecondOpen: !prevState.isSecondOpen,
    }));
  };

  const commonLabel = 'Show';
  const firstCompLabel = `${commonLabel} Description`;
  const secondCompLabel = `${commonLabel} Code`;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box>
        <Collapse in={openComponent.isFirstOpen}>{firstComponent}</Collapse>
        <Collapse in={openComponent.isSecondOpen}>{secondComponent}</Collapse>
      </Box>
      <Box>
        <FormControlLabel
          control={<Switch />}
          label={!openComponent.isFirstOpen ? firstCompLabel : secondCompLabel}
          labelPlacement="end"
          onClick={toggleComponentCollapse}
          sx={{ color: theme.palette.secondary.contrastText }}
        />
      </Box>
    </Container>
  );
};

export default ProjectMobileSlider;
