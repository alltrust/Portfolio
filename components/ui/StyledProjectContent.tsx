import { styled } from '@mui/material/styles';
import { IProject } from '../../types/app/Iproject';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinksItem from '../sections/LinksItem';

const StyledContentPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.primary,
  padding: '2%',
  backgroundColor: theme.palette.mode !== 'dark' ? '#d1d1f5' : '#18181a',

  '& > div:nth-of-type(2)': {
    marginBottom: '1rem',
  },
}));

interface IStyledProjectContent {
  subHeading: IProject['subHeading'];
  summary: IProject['summary'];
  stack: IProject['stack'];
  slug: IProject['slug'];
  links: IProject['links'];
}

const StyledProjectContent = ({
  summary,
  slug,
  links,
  subHeading,
}: IStyledProjectContent) => {
  return (
    <StyledContentPaper elevation={3}>
      <Box>
        <Typography variant="h5" component="h5">
          {subHeading}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" component="p" marginTop="1rem">
          {summary}
        </Typography>
      </Box>
      <LinksItem slug={slug} links={links} />
    </StyledContentPaper>
  );
};

export default StyledProjectContent;
