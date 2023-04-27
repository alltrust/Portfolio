import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { IProject } from '../sections/FeaturedProjects';

const StyledDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  color: theme.palette.text.primary,
}));

interface IStyledTechStackBox {
  stack: IProject['stack'];
}

const StyledTechStack = ({ stack }: IStyledTechStackBox) => {
  return (
    <StyledDiv>
      {stack.map((tech, idx) => {
        return (
          <Typography key={idx} variant="body2" component="p">
            {tech}
          </Typography>
        );
      })}
    </StyledDiv>
  );
};

export default StyledTechStack;
