import { styled } from '@mui/material/styles';
import { IProject } from '../../types/app/Iproject';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StyledTechStack from './StyledTechStack';
import LinksItem from '../sections/LinksItem';

const StyledContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.primary,

  '& > div:nth-of-type(2)': {
    marginBottom: '1rem',
  },
}));

interface IStyledProjectContent {
  title: IProject['title'];
  summary: IProject['summary'];
  stack: IProject['stack'];
  slug: IProject['slug'];
  links: IProject['links'];
}

const StyledProjectContent = ({
  title,
  summary,
  stack,
  slug,
  links,
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
      <LinksItem slug={slug} links={links} />
    </StyledContentBox>
  );
};

export default StyledProjectContent;
