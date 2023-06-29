import Box from '@mui/material/Box';
import { styled, useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TypeAnimation } from 'react-type-animation';


const TypeAnimationBox = () => {
  const StyledTypeAnimation = styled(TypeAnimation)(({theme})=>({
    '&::after': {
      color: theme.palette.secondary.dark,
    },
  }));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'absolute',
        textAlign: 'end',
        right: '10px',
        color: theme.palette.primary.light,
      }}
    >
      <StyledTypeAnimation
        sequence={[
          'I am Aldo Garcia',
          1100,
          'I am a fullstack developer',
          1100,
          'I am YOUR fullstack developer',
          1100,
        ]}
        style={{ fontSize: !isMobile ?'4em' : '3rem'}}
        repeat={Infinity}
        wrapper="h2"
      />
    </Box>
  );
};

export default TypeAnimationBox;
