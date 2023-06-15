import { Typography } from '@mui/material';
import { NextPage } from 'next/types';
import PageTemplate from '../components/layout/PageTemplate';

const AboutPage: NextPage = () => {
  return (
    <PageTemplate>
      <Typography variant="h1" component="h1">
        ABOUT
      </Typography>
    </PageTemplate>
  );
};

export default AboutPage;
