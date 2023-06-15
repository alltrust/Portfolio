import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Seperator from '../ui/SeperationLine';
import { useInView } from 'react-intersection-observer';

interface ISectionTemplate {
  heading?: string;
  children: React.ReactNode;
  showSeperator?: boolean;
  isFooter?: boolean;
}

const SectionTemplate = ({
  heading,
  children,
  showSeperator = true,
  isFooter = false,
}: ISectionTemplate) => {
  const [sectionRef, inView] = useInView({
    threshold: 0.2,
  });

  return (
    <Box
      ref={sectionRef}
      sx={{
        minHeight: isFooter ? '50vh' : '100vh',
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
      {showSeperator ? <Seperator /> : null}
    </Box>
  );
};

export default SectionTemplate;
