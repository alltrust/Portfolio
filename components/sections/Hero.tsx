import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import NextImage from 'next/image';

const HeroSection = () => {
  const theme = useTheme();
  const xsScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const imgOrientation = xsScreen ? 'portrait' : 'landscape';
  const imgMode = theme.palette.mode === 'dark' ? 'dark' : 'light';

  const heroImg = `/images/hero/${imgOrientation}-${imgMode}.jpg`;

  return (
    <>
      <Box
        sx={{
          height: '95vh',
          display: 'flex',
          // alignItems: 'center',
          flexDirection: !xsScreen ? 'row' : 'column',
          // justifyContent: 'center',
        }}
      >
        {/* <Grid container spacing={2}>
        <Grid container item xs={12} sm>
          <Grid
            item
            xs
            container
            direction="column"
            spacing={2}
            sx={{ alignItems: 'flex-start' }}
          >
            <Typography variant="subtitle1" component="h4">
              Hi, my name is
            </Typography>
            <Typography variant="h1" component="h1">
              Aldo Garcia
            </Typography>
            <Typography variant="subtitle1" component="h4">
              I am an aspiring full-stack developer from Aurora, ON.
            </Typography>
            <Typography variant="body2" component="p">
              Scroll for my journey
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <NextImage
              src="/images/image_dp.jpg"
              alt="aldo garcia"
              width={300}
              height={400}
            />
            </Grid>
        </Grid>
      </Grid> */}
        {!xsScreen ? (
          <Box
            sx={{
              width: '15%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <Box sx={{ width: '100%', height: '50%', position: 'relative' }}>
              <NextImage src="/images/image_dp.jpg" alt="aldo garcia" fill />
            </Box>
            <Box sx={{ backgroundColor: 'grey', height: '50%' }}>box</Box>
          </Box>
        ) : null}
        <Box
          sx={{
            width: !xsScreen ? '85%' : '100%',
            position:'relative',
            height:'100%'
          }}
        >
          <NextImage src={heroImg} alt="hero Image" fill priority />
        </Box>
      </Box>
      {xsScreen ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            height: '100vh'

          }}
        >
          <Box sx={{ width: '80%', height: '50%', position: 'relative' }}>
            <NextImage src="/images/image_dp.jpg" alt="aldo garcia" fill />
          </Box>
          <Box sx={{ backgroundColor: 'grey', height: '50%' }}>box</Box>
        </Box>
      ) : null}
    </>
  );
};

export default HeroSection;
