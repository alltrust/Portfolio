import { useState } from 'react';
import { useTheme, useMediaQuery, styled, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Image from 'next/image';
import StyledProjectContent from '../ui/StyledProjectContent';
import { IProject } from '../../types/app/Iproject';
import { useInView } from 'react-intersection-observer';
import CodeSnippet from '../code-snippet';
import Collapse from '@mui/material/Collapse';
import CodeIcon from '@mui/icons-material/Code';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import StyledTechStack from '../ui/StyledTechStack';
import NextLink from 'next/link';

interface IProjectProps {
  project: IProject;
}

const StyledCodeButton = styled(Button)`
  &:hover {
    background-color: #e9e0ec;
    transition: background-color 0.3s ease-in-out;
  }
`;

const StyledImageOverlay = styled(Box)`
  background-color: rgba(255, 0, 0, 0.55);
  opacity: 0.5;
`;

const Project = ({ project }: IProjectProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isExpanded, setIsExpanded] = useState(false);
  const { image, links, slug, stack, summary, content, subHeading, title } =
    project;

  const handleToggleExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const regex = /```js[\s\S]*?```/g;
  const codeSnippets = content.match(regex);

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: !isMobile ? 0.5 : 0,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ marginBottom: '1rem', textAlign: 'center' }}>
        <Typography
          variant={isMobile ? 'h6' : 'h3'}
          component={isMobile ? 'h6' : 'h3'}
        >
          {title}
        </Typography>

        {!isMobile ? (
          <>
            <StyledTechStack stack={stack} />
          </>
        ) : null}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          ref={imageRef}
          sx={{
            width: isMobile ? '100%' : 'inherit',
            marginBottom: isMobile ? '2rem' : 0,
            opacity: imageInView ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out',
            textAlign: 'center',
            marginRight: isMobile ? '' : '1%',
          }}
        >
          <NextLink href={`/projects/${slug}`}>
            <StyledImageOverlay>
              <Image
                src={`/images/projects/${image}`}
                alt={`${image}`}
                width={!isMobile ? 500 : 350}
                height={!isMobile ? 375 : 250}
                style={{
                  objectFit: 'cover',
                  boxShadow: theme.shadows[8],
                  borderRadius: '2%',
                }}
              />
            </StyledImageOverlay>
          </NextLink>
        </Box>
        <Box sx={{ width: isMobile ? '100%' : '50%' }}>
          {!isMobile && codeSnippets ? (
            <Paper
              elevation={3}
              sx={{
                borderRadius: '5px',
                marginBottom: '2%',
                backgroundColor:
                  theme.palette.mode !== 'dark' ? '#b4f0db' : '#680cf1',
              }}
            >
              <Collapse in={isExpanded} collapsedSize={200}>
                <CodeSnippet selectedSnippet={codeSnippets[0]} />
              </Collapse>
              <StyledCodeButton onClick={handleToggleExpanded}>
                <CodeIcon sx={{ color: theme.palette.secondary.dark }} />
              </StyledCodeButton>
            </Paper>
          ) : null}
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
                transition:
                  'opacity 0.6s ease-in-out, transform 0.6s ease-in-out',
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
        </Box>
      </Box>
    </Container>
  );
};

export default Project;
