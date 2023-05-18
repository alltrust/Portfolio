import { useState } from 'react';
import { useTheme, useMediaQuery, styled } from '@mui/material';
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

interface IProjectProps {
  project: IProject;
}

const StyledCodeButton = styled(Button)`
  &:hover {
    background-color: #ccc; // set to the grey color you want
    transition: background-color 0.3s ease-in-out;
  }
`;

const Project = ({ project }: IProjectProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, image, links, slug, stack, summary, content } = project;

  const handleToggleExpanded = (el: any) => {
    console.log(el);
    setIsExpanded((prevState) => !prevState);
  };

  // const getCodeSnippet = useMemo(() => {
  const regex = /```js[\s\S]*?```/g;
  const codeSnippets = content.match(regex);
  console.log(codeSnippets);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: !isMobile ? 0.5 : 0,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  return (
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
          marginRight: isMobile ?  'inherit' : '1%',
        }}
      >
        <Image
          src={`/images/projects/${image}`}
          alt=""
          width={500}
          height={400}
          style={{
            objectFit: 'cover',
            boxShadow: theme.shadows[10],
            borderRadius: '2%',
          }}
        />
      </Box>
      <Box sx={{ width: '40%' }}>
        {!isMobile && codeSnippets ? (
          <Box>
            <Collapse in={isExpanded} collapsedSize={200}>
              <CodeSnippet selectedSnippet={codeSnippets[0]} />
            </Collapse>
            <StyledCodeButton onClick={handleToggleExpanded}>
              <CodeIcon />
            </StyledCodeButton>
          </Box>
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
              padding: '2%',
            }}
          >
            <StyledProjectContent
              title={title}
              summary={summary}
              stack={stack}
              slug={slug}
              links={links}
            />
          </Box>
        </Slide>
      </Box>
    </Box>
  );
};

export default Project;
