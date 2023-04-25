import Container from '@mui/material/Container';
import { Breakpoint } from '@mui/material/styles';

interface IStyledContainer {
  widthSize?: false | Breakpoint | undefined;
  children: React.ReactNode;
}

const StyledContainer = ({ widthSize = 'md', children }: IStyledContainer) => {
  return (
    <Container
      sx={{ marginTop: '2rem', marginBottom: '2rem' }}
      maxWidth={widthSize}
    >
      {children}
    </Container>
  );
};

export default StyledContainer;
