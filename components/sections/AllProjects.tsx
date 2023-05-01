import ImageList from '@mui/material/ImageList';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import SectionTemplate from '../layout/SectionTemplate';
import ProjectItem from './ProjectItem';
import { IProject } from '../../types/app/Iproject';


interface IAllProjectsSection{
  allProjects: IProject[]
}

const AllProjectsSection = ({allProjects}:IAllProjectsSection) => {
  const allProjecstHeading = 'My Projects';
  const theme = useTheme();

  const lgScreen = useMediaQuery(theme.breakpoints.up('md'));
  const smScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const xsScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const columns = xsScreen ? 1 : smScreen ? 2 : 3;
  const height = lgScreen ? 300 : 200;

  //all the data will have a slug property. 
  //use that as the key

  return (
    <SectionTemplate heading={allProjecstHeading}>
      <Box width="100%">
        <ImageList sx={{ width: '100%' }} cols={columns} rowHeight={height}>
          {allProjects.map((project) => (
            <ProjectItem
              key={project.slug}
              image={`/images/projects/${project.image}`}
              title={project.title}
              author={project.author}
              slug={project.slug}
              date={project.dateCreated}
            />
          ))}
        </ImageList>
      </Box>
    </SectionTemplate>
  );
};

export default AllProjectsSection;
