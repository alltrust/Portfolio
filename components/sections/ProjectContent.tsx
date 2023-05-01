import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProjectBanner from './ProjectBanner';
import { IProject } from '../../types/app/Iproject';


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
        <Typography>
          {content
            ? content
            : ' ..some content with subheading and content! think about: what this project does ..perhaps show a demo ..the stack, why decisions weremade project limitations; and how these limitations can be improved'}
        </Typography>
      </Box>
    </Container>
  );
};

export default ProjectContent;
