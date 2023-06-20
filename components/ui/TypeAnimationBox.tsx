import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { TypeAnimation } from 'react-type-animation';

const TypeAnimationBox = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        textAlign: 'end',
        right: '0',
        color: theme.palette.text.primary,
      }}
    >
      <TypeAnimation
        sequence={[
          'I am Aldo Garcia',
          1100,
          'I am a fullstack developer',
          1100,
          'I am YOUR fullstack developer',
          1100,
        ]}
        style={{ fontSize: '4em' }}
        repeat={Infinity}
        wrapper="h2"
      />
    </Box>
  );
};

export default TypeAnimationBox;
