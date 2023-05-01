import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Seperator from '../ui/SeperationLine';

interface ISectionTemplate {
  heading: string;
  children: React.ReactNode;
}

const SectionTemplate = ({ heading, children }: ISectionTemplate) => {
  return (
    <>
      <Container>
        <Box sx={{ marginBottom: '3rem', marginTop: "3rem" }}>
          <Typography variant="h2" component="h2">
            {heading}
          </Typography>
        </Box>
        {children}
      </Container>
      <Seperator />
    </>
  );
};

export default SectionTemplate;
