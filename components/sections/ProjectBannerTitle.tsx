import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IProject } from '../../types/app/Iproject';

interface IProjectBannerTitle {
  title: IProject['title'];
}

const ProjectBannerTitle = ({ title }: IProjectBannerTitle) => {
  return (
    <Box sx={{ width: '100%', textAlign: 'start' }}>
      <Typography variant="h2" component="h2">
        {title}
      </Typography>
    </Box>
  );
};

export default ProjectBannerTitle;
