import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import NextImage from 'next/image';
import SkillSet from '../ui/skill-set';
import TypeAnimationBox from '../ui/TypeAnimationBox';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const imgOrientation = isMobile ? 'portrait' : 'landscape';
  const imgMode = theme.palette.mode === 'dark' ? 'dark' : 'light';

  const heroImg = `/images/hero/${imgOrientation}-${imgMode}.jpg`;

  return (
    <Box
      sx={{
        height: '94vh',
        display: 'flex',
        flexDirection: !isMobile ? 'row' : 'column',
        marginTop: isMobile? '7px' : ''
      }}
    >
      {!isMobile ? (
        <Box
          sx={{
            width: '15%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Box sx={{ width: '100%', height: '50%', position: 'relative' }}>
            <NextImage
              src="/images/image_dp.jpg"
              alt="aldo garcia"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 600px) 100vw, 200px"
            />
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.secondary.main,
              height: '50%',
            }}
          >
            <SkillSet />
          </Box>
        </Box>
      ) : null}
      <Box
        sx={{
          width: !isMobile ? '85%' : '100%',
          position: 'relative',
          height: '100%',
        }}
      >
        <NextImage
          src={heroImg}
          alt="hero Image"
          fill
          priority
          sizes="(max-width: 600px) 100vw, 85vw"
        />
        <TypeAnimationBox />
      </Box>
    </Box>
  );
};

export default HeroSection;
