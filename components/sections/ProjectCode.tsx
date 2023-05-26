import { useState } from 'react';
import { useTheme } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import CodeSnippet from '../code-snippet';
import MotionButton from '../ui/MotionButton';
import CodeIcon from '@mui/icons-material/Code';

interface IProjectCode{
    codeSnippets: string
}

const ProjectCode = ({codeSnippets}:IProjectCode) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const theme = useTheme();

  const handleToggleExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: '5px',
        marginBottom: '2%',
        backgroundColor: theme.palette.mode !== 'dark' ? '#b4f0db' : '#680cf1',
      }}
    >
      <Collapse in={isExpanded} collapsedSize={200}>
        <CodeSnippet selectedSnippet={codeSnippets} />
      </Collapse>
      <MotionButton onClick={handleToggleExpanded} cursor={true}>
        <CodeIcon sx={{ color: theme.palette.secondary.dark }} />
      </MotionButton>
    </Paper>
  );
};

export default ProjectCode;
