// import StyledContainer from '../StyledContainer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <Container sx={{ height: '90vh', display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={2}>
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
          <Grid
            item
            xs={4}
          >
            <Image
              src="/images/image_dp.jpg"
              alt="aldo garcia"
              width={300}
              height={400}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeroSection;
