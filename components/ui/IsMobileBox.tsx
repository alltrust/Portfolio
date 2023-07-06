import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactNode } from 'react';

interface IIsMobileBox {
  children: ReactNode | ReactNode[];
  width?: string
}

const IsMobileBox = ({ children, width }: IIsMobileBox) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width ? width : 'inherit'
      }}
    >
      {children}
    </Box>
  );
};

export default IsMobileBox;
