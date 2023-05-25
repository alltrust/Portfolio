import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { IProject } from '../../types/app/Iproject';

const StyledDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  color: theme.palette.secondary.contrastText,
  width: '100%',
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
