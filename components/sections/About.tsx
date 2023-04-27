import SectionTemplate from '../layout/SectionTemplate';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AboutSection = () => {
  const aboutHeading = 'Who am I?';
  return (
    <SectionTemplate heading={aboutHeading}>
      <Box>
        <Typography></Typography>
      </Box>
      <Box>
        <Typography></Typography>
      </Box>
      <Box>
        <Typography></Typography>
      </Box>
      <Box>
        <Typography></Typography>
      </Box>
    </SectionTemplate>
  );
};

export default AboutSection;
