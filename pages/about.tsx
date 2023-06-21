import Container from '@mui/material/Container';
import { GetStaticProps, NextPage } from 'next/types';
import PageTemplate from '../components/layout/PageTemplate';
import { IAboutMeData } from '../types/app/IAboutMeData';
import { getAboutMePost } from '../lib/fetchAboutMe';
import AboutContent from '../components/sections/AboutContent';

interface IAboutPage {
  aboutMeData: IAboutMeData;
}

const AboutPage: NextPage<IAboutPage> = ({ aboutMeData }) => {
  //insert image and journey path
  return (
    <PageTemplate>
      <Container maxWidth={'md'}>
        <AboutContent aboutMeData={aboutMeData} />
      </Container>
    </PageTemplate>
  );
};

export const getStaticProps: GetStaticProps<{
  aboutMeData: IAboutMeData;
}> = async () => {
  const aboutMeDatas = getAboutMePost();

  const aboutMeData = aboutMeDatas[0];

  return {
    props: {
      aboutMeData,
    },
  };
};

export default AboutPage;
