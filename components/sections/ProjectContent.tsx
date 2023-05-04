import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProjectBanner from './ProjectBanner';
import { IProject } from '../../types/app/Iproject';
import MarkdownComponent from '../markdown-content';


interface IProjectContent {
  project: IProject
}

const ProjectContent = ({project}:IProjectContent) => {
  const { title, content, image, author, dateCreated, stack } = project;
  return (
    <Container>
      <ProjectBanner
        image={`/images/projects/${image}`}
        title={title}
        author={author}
        date={dateCreated}
      />
      <Box>
       <MarkdownComponent content={content}/>
      </Box>
    </Container>
  );
};

export default ProjectContent;
