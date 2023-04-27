import Box from '@mui/material/Container';
import { Breakpoint } from '@mui/material/styles';

interface IStyledBox {
  widthSize?: false | Breakpoint | undefined;
  children: React.ReactNode;
  marginT?: string;
  marginB?: string;
}

const StyledBox = ({
  widthSize = 'md',
  children,
  marginT = '2rem',
  marginB = '2rem',
}: IStyledBox) => {
  return (
    <Box
      sx={{ marginTop: marginT, marginBottom: marginB }}
      maxWidth={widthSize}
    >
      {children}
    </Box>
  );
};

export default StyledBox;
