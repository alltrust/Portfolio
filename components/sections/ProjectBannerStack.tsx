import Box from '@mui/material/Box';
import { IProject } from '../../types/app/Iproject';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface IProjectBannerStack {
  stack: IProject['stack'];
}
const ProjectBannerStack = ({ stack }: IProjectBannerStack) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          width: '95%',
          marginBottom: !isMobile ? '1rem' : '-10px',
        }}
      >
        {stack.map((name) => {
          return (
            <Typography
              key={name}
              sx={{ color: theme.palette.primary.main, fontSize: '11px' }}
            >
              {name}
            </Typography>
          );
        })}
      </Box>
    </>
  );
};

export default ProjectBannerStack;
