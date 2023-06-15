import Box from '@mui/material/Box';
import NextImage from 'next/image';
import { IProject } from '../../types/app/Iproject';

interface IProjectBannerImg {
  image: IProject['image'];
}

const ProjectBannerImg = ({ image }: IProjectBannerImg) => {
  return (
    <Box
      maxWidth="md"
      sx={{ backgroundColor: 'red', height: '400px', width: '100%' }}
    >
      {/* <NextImage src={image} fill alt={title} style={{objectFit:"contain"}}/> */}
    </Box>
  );
};

export default ProjectBannerImg;
