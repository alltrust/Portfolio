import Box from '@mui/material/Box';
import NextImage from 'next/image';
import { IProject } from '../../types/app/Iproject';

interface IProjectBannerImg {
  image: IProject['image'];
  title: IProject['title'];
}

const ProjectBannerImg = ({ image, title }: IProjectBannerImg) => {
  return (
    <Box
      maxWidth="md"
      sx={{ height: '400px', width: '100%', position: 'relative' }}
    >
      <NextImage 
        src={image}
        fill
        alt={title}
        style={{ objectFit: 'contain' }}
        sizes="(max-width: 600px) 100vw, 85vw"
      />
    </Box>
  );
};

export default ProjectBannerImg;
