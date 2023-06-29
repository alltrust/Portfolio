import type { NextPage } from 'next';
import HeroSection from '../components/sections/Hero';
import FeaturedProjectsSection from '../components/sections/FeaturedProjects';
import { IProject } from '../types/app/Iproject';
import InfoSection from '../components/sections/PortfolioInfo';
import { getFeaturedProjects, getPortfolioProject } from '../lib/fetch-project';
import NullDataDisplay from '../components/ui/NullDataDisplay';
import PageTemplate from '../components/layout/PageTemplate';

interface IHomeProps {
  featuredProjectData: IProject[];
  portfolioProject: IProject;
}

const Home: NextPage<IHomeProps> = ({
  featuredProjectData,
  portfolioProject,
}) => {
  return (
    <PageTemplate>
      <HeroSection />
      <InfoSection portfolioData={portfolioProject} />
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
  const portfolioProject = getPortfolioProject();

  return {
    props: {
      featuredProjectData,
      portfolioProject,
    },
    revalidate: 1800,
  };
}

export default Home;
