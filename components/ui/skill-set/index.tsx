import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useTheme, styled } from '@mui/material/styles';
import NextImage from 'next/image';

const DynamicSlider = styled(Slider)(({ color }) => ({
  '& .MuiSlider-thumb': {
    backgroundColor: color,
  },
  // '& .MuiSlider-rail': {
  //   backgroundColor: color,
  // },
  '& .MuiSlider-track': {
    backgroundColor: color,
  },
}));

const SkillSet = () => {
  const theme = useTheme();

  const skills = [
    {
      name: 'JavaScript',
      years: 2,
      svg: '/svg/javascript-svgrepo-com.svg',
      color: 'yellow',
    },
    {
      name: 'TypeScript',
      years: 1.5,
      svg: '/svg/typescript-official-svgrepo-com.svg',
      color: 'blue',
    },
    {
      name: 'Node',
      years: 1.5,
      svg: '/svg/node-js-svgrepo-com.svg',
      color: 'green',
    },
    {
      name: 'React',
      years: 1.75,
      svg: '/svg/react-svgrepo-com.svg',
      color: 'aquamarine',
    },
    {
      name: 'Next',
      years: 0.5,
      svg: '/svg/next-dot-js-svgrepo-com.svg',
      svgForDark: '/svg/nextjs-svgrepo-white.svg',
      color: 'black',
    },
    {
      name: 'MongoDb',
      years: 1.5,
      svg: '/svg/mongodb-svgrepo-com.svg',
      color: 'green',
    },
  ];

  const marks = [
    { value: 0, label: '0' },
    { value: 33, label: '1y' },
    { value: 66, label: '2y' },
    { value: 100, label: '3y' },
  ];

  return (
    <Box
      sx={{
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}
    >
      {skills.map((skill) => {
        const { svg, name, years, svgForDark, color } = skill;

        return (
          <Box
            key={name}
            display="flex"
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-evenly'}
          >
            <NextImage
              src={
                theme.palette.mode === 'dark' && svgForDark ? svgForDark : svg
              }
              alt="logo"
              width={20}
              height={20}
            />
            <DynamicSlider
              disabled
              sx={{ width: '80%' }}
              value={(years / 3) * 100}
              min={0}
              max={100}
              color="primary"
              marks={marks}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default SkillSet;
