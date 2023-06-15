import type { NextPage } from 'next';
import HeroSection from '../components/sections/Hero';
import FeaturedProjectsSection from '../components/sections/FeaturedProjects';
import { IProject } from '../types/app/Iproject';
import AboutSection from '../components/sections/About';
import InfoSection from '../components/sections/Info';
import { getFeaturedProjects } from '../lib/fetch-project';
import useAppContext from '../hooks/useAppContext';
import NullDataDisplay from '../components/ui/NullDataDisplay';
import PageTemplate from '../components/layout/PageTemplate';

interface IHomeProps {
  featuredProjectData: IProject[];
}

const Home: NextPage<IHomeProps> = ({ featuredProjectData }) => {
  const { state } = useAppContext();
  //dispatch context to store the featuredProjectData in the

  //perhaps include a fullscreen modal/ overlay to welcome to page
  

  return (
    <PageTemplate>
      <HeroSection />
      <InfoSection />
      <AboutSection />
      {featuredProjectData ? (
        <FeaturedProjectsSection featuredData={featuredProjectData} />
      ) : (
        <NullDataDisplay />
      )}
    </PageTemplate>
  );
};

export async function getStaticProps() {
  const featuredProjectData = getFeaturedProjects();

  return {
    props: {
      featuredProjectData,
    },
    revalidate: 1800,
  };
}

export default Home;
 