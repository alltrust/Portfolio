import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import { IProject } from '../../types/app/Iproject';
import { useInView } from 'react-intersection-observer';
import StyledProjectContent from '../ui/StyledProjectContent';

interface IProjectSummary {
  isMobile: boolean;
  imageInView: boolean;
  summary: IProject['summary'];
  stack: IProject['stack'];
  slug: IProject['slug'];
  links: IProject['links'];
  subHeading: IProject['subHeading'];
}

const ProjectSummary = ({
  isMobile,
  imageInView,
  summary,
  stack,
  slug,
  links,
  subHeading,
}: IProjectSummary) => {
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  return (
    <Slide
      in={isMobile ? imageInView : contentInView}
      direction="right"
      timeout={{ enter: 1000 }}
    >
      <Box
        ref={contentRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: isMobile ? '95%' : '100%',
          opacity: contentInView ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <StyledProjectContent
          summary={summary}
          stack={stack}
          slug={slug}
          links={links}
          subHeading={subHeading}
        />
      </Box>
    </Slide>
  );
};
export default ProjectSummary;
