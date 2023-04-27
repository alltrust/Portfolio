import Image from 'next/image';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ProjectBanner = () => {
  return (
    <Container>
      <Box maxWidth={'lg'}>
        <Image src="" alt="" fill />
      </Box>
      <Box>
        <Typography>Title</Typography>
        <Typography>Author</Typography>
        <Typography>Date</Typography>
      </Box>
    </Container>
  );
};

export default ProjectBanner;
