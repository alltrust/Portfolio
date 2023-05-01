import Image from 'next/image';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IProject } from '../../types/app/Iproject';

interface IProjectBanner {
  title: IProject['title'],
  author: IProject['author'],
  date: IProject['dateCreated']
  image: IProject['image']
}

const ProjectBanner = ({title, author, date, image}:IProjectBanner) => {


  return (
    <Container>
      <Box maxWidth={'lg'}>
        <Image src={image} alt={title} width={200} height={150}  />
      </Box>
      <Box>
        <Typography>{title}</Typography>
        <Typography>{author}</Typography>
        <Typography>{date}</Typography>
      </Box>
    </Container>
  );
};

export default ProjectBanner;
