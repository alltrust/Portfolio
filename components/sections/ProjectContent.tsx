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
  const { title, content, image, author, dateCreated, stack } = project;

  const subHeadingFind = /^(#{3,4})\s+(.*)$/gm;
  const contentHeaders = content.match(subHeadingFind)
  
  const readingTime = calculateReadingTime(content);


  return (
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={2}/>
          <Grid item xs={8}>
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
                <MarkdownComponent content={content}/>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <TableOfContents headings={contentHeaders} title={title}/>
            </Box>
          </Grid>
        </Grid>
      </Container>
  );
};

export default ProjectContent;
