import { useTheme, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ProjectBanner from './ProjectBanner';
import { IProject } from '../../types/app/Iproject';
import { calculateReadingTime } from '../../utils/calculateReadingTime';
import MarkdownComponent from '../markdown-content';
import TableOfContents from '../ui/table-of-contents';
import Grid from '@mui/material/Grid';

interface IProjectContent {
  project: IProject;
}

const ProjectContent = ({ project }: IProjectContent) => {
  const { title, content, image, author, dateCreated } = project;

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'xl'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  let gridSizeMain;
  let gridSizeOutter;

  if (isMediumScreen) {
    gridSizeMain = 6;
    gridSizeOutter = 3;
  }
  if (isLargeScreen) {
    gridSizeMain = 8;
    gridSizeOutter = 2;
  }

  const subHeadingFind = /^(#{3,4})\s+(.*)$/gm;
  const contentHeaders = content.match(subHeadingFind);

  const readingTime = calculateReadingTime(content);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={!isSmallScreen ? 3 : 0}>
        <Grid item xs={gridSizeOutter} />
        <Grid item xs={12} sm={gridSizeMain}>
          <Box>
            <ProjectBanner
              authorImage={'/images/projects/image_dp.jpg'}
              title={title}
              author={author}
              date={dateCreated}
              image={`/images/projects/${image}`}
              readingTime={readingTime}
            />
            <Box>
              <MarkdownComponent content={content} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={gridSizeOutter}>
          {!isSmallScreen ? (
            <Box>
              <TableOfContents headings={contentHeaders} title={title} />
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectContent;
