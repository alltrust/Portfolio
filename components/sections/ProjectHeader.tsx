import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StyledTechStack from '../ui/StyledTechStack';
import { IProject } from '../../types/app/Iproject';

interface IProjectHeader {
  isMobile: boolean;
  title: IProject['title'];
  stack: IProject['stack'];
}

const ProjectHeader = ({ isMobile, title, stack }: IProjectHeader) => {
  return (
    <Box sx={{ marginBottom: '1rem', textAlign: 'center' }}>
      <Typography
        variant={isMobile ? 'h6' : 'h3'}
        component={isMobile ? 'h6' : 'h3'}
      >
        {title}
      </Typography>

      {!isMobile ? (
        <>
          <StyledTechStack stack={stack} />
        </>
      ) : null}
    </Box>
  );
};

export default ProjectHeader;
