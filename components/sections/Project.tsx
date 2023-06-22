import { useTheme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { IProject } from '../../types/app/Iproject';
import { useInView } from 'react-intersection-observer';
import Container from '@mui/material/Container';
import ProjectHeader from './ProjectHeader';
import ProjectImage from './ProjectImage';
import ProjectCode from './ProjectCode';
import ProjectSummary from './ProjectSummary';
import { selectJsCodeSnippets } from '../../utils/selectJsCodeSnippets';
import ProjectMobileSlider from './ProjectMobileSlider';
import IsMobileBox from '../ui/IsMobileBox';

interface IProjectProps {
  project: IProject;
}

const Project = ({ project }: IProjectProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { image, links, slug, stack, summary, content, subHeading, title } =
    project;

  const codeSnippets = selectJsCodeSnippets(content);

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: !isMobile ? 0.5 : 0,
  });

  return (
    <Container maxWidth="md">
      <ProjectHeader isMobile={isMobile} stack={stack} title={title} />
      <IsMobileBox>
        <ProjectImage
          imageRef={imageRef}
          imageInView={imageInView}
          isMobile={isMobile}
          slug={slug}
          image={image}
        />
        <Box sx={{ width: isMobile ? '100%' : '50%' }}>
          {!isMobile && codeSnippets ? (
            <ProjectCode codeSnippets={codeSnippets[0]} />
          ) : null}
          {!isMobile ? (
            <ProjectSummary
              isMobile={isMobile}
              imageInView={imageInView}
              summary={summary}
              stack={stack}
              links={links}
              subHeading={subHeading}
              slug={slug}
            />
          ) : (
            <ProjectMobileSlider
              firstComponent={
                <ProjectSummary
                  isMobile={true}
                  imageInView={imageInView}
                  summary={summary}
                  stack={stack}
                  slug={slug}
                  links={links}
                  subHeading={subHeading}
                />
              }
              secondComponent={
                <ProjectCode
                  codeSnippets={
                    codeSnippets ? codeSnippets[0] : '// no code available'
                  }
                />
              }
            />
          )}
        </Box>
      </IsMobileBox>
    </Container>
  );
};

export default Project;
