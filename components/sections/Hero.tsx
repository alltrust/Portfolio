import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import SkillSet from '../ui/skill-set';
import TypeAnimationBox from '../ui/TypeAnimationBox';
import ThemedImage from '../ui/ThemedImage';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        height: '94vh',
        display: 'flex',
        flexDirection: !isMobile ? 'row' : 'column',
        marginTop: isMobile ? '3px' : '',
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
            <ThemedImage
              src="/images/image_dp.jpg"
              alt="aldo garcia"
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 600px) 100vw, 200px"
              isMobile={isMobile}
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
        <ThemedImage
          alt="hero Image"
          isMobile={isMobile}
          priority
          sizes="(max-width: 600px) 100vw, 85vw"
        />
        <TypeAnimationBox />
      </Box>
    </Box>
  );
};

export default HeroSection;
