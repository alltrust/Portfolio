import { styled } from '@mui/material/styles';
import { IProject } from '../sections/FeaturedProjects';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StyledTechStack from './StyledTechStack';

const StyledContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.secondary.main,
  color: theme.palette.text.primary,

  '& > div:nth-of-type(2)': {
    marginTop: '2rem',
    marginBottom: '1rem',
  },
}));

interface IStyledProjectContent {
  title: IProject['title'];
  summary: IProject['summary'];
  stack: IProject['stack'];
}

const StyledProjectContent = ({
  title,
  summary,
  stack,
}: IStyledProjectContent) => {
  return (
    <StyledContentBox>
      <Box>
        <Typography variant="h3" component="h3">
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" component="p">
          {summary}
        </Typography>
      </Box>
      <StyledTechStack stack={stack} />
    </StyledContentBox>
  );
};

export default StyledProjectContent;
