import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Seperator from '../ui/SeperationLine';
import { useInView } from 'react-intersection-observer';

interface ISectionTemplate {
  heading?: string;
  children: React.ReactNode;
}

const SectionTemplate = ({ heading, children }: ISectionTemplate) => {

  const [sectionRef, inView] = useInView({
    threshold: 0.2,
  });



  return (
    <Box
      ref={sectionRef}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      {heading ? (
        <Box sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
          <Typography variant="h2" component="h2">
            {heading}
          </Typography>
        </Box>
      ) : null}
      {children}
      <Seperator />
    </Box>
  );
};

export default SectionTemplate;
