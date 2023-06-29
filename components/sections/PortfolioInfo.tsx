import { IProject } from '../../types/app/Iproject';
import SectionTemplate from '../layout/SectionTemplate';
import { selectJsCodeSnippets } from '../../utils/selectJsCodeSnippets';
import ProjectCode from './ProjectCode';
import ProjectSummary from './ProjectSummary';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import { useInView } from 'react-intersection-observer';

interface IInfoSection {
  portfolioData: IProject;
}

const InfoSection = ({ portfolioData }: IInfoSection) => {
  const { content, summary, stack, slug, links, subHeading } = portfolioData;

  const infoHeading = 'Next Portfolio';

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [sectionRef, sectionInView] = useInView({
    threshold: 0.2,
  });

  const codeSnippets = selectJsCodeSnippets(content);

  return (
    <SectionTemplate heading={infoHeading}>
      <Container maxWidth="md" ref={sectionRef}>
        <Grid container spacing={2} direction={isMobile ? 'column' : 'row'}>
          {codeSnippets && isMobile && (
            <Grow in={sectionInView}>
              <Grid item xs={12} width={'100%'}>
                <Box textAlign="center">
                  <ProjectCode codeSnippets={codeSnippets[0]} />
                </Box>
              </Grid>
            </Grow>
          )}
          <Grid item xs={12} md={6}>
            <Grow
              in={sectionInView}
              style={{ transformOrigin: '0 0 0' }}
              {...(sectionInView ? { timeout: 1200 } : {})}
            >
              <Box textAlign={isMobile ? 'center' : 'left'}>
                <ProjectSummary
                  summary={summary}
                  stack={stack}
                  slug={slug}
                  links={links}
                  subHeading={subHeading}
                />
              </Box>
            </Grow>
          </Grid>
          {!isMobile && (
            <Grow in={sectionInView}>
              <Grid item xs={12} md={6}>
                {codeSnippets && (
                  <Box textAlign="left">
                    <ProjectCode codeSnippets={codeSnippets[0]} />
                  </Box>
                )}
              </Grid>
            </Grow>
          )}
        </Grid>
      </Container>
    </SectionTemplate>
  );
};

export default InfoSection;
