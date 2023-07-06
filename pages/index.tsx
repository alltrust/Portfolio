import type { NextPage } from 'next';
import HeroSection from '../components/sections/Hero';
import FeaturedProjectsSection from '../components/sections/FeaturedProjects';
import { IProject } from '../types/app/Iproject';
import InfoSection from '../components/sections/PortfolioInfo';
import {
  getFeaturedProjects,
  getLinksandSlugs,
  getPortfolioProject,
} from '../lib/fetch-project';
import NullDataDisplay from '../components/ui/NullDataDisplay';
import PageTemplate from '../components/layout/PageTemplate';
import AboutMeSection from '../components/sections/AboutMeSection';

interface IHomeProps {
  featuredProjectData: IProject[];
  portfolioProject: IProject;
  projectNamesWithLinks: {
    name: string;
    links: string[];
    slug: string;
    stack: string[];
  }[];
}

const Home: NextPage<IHomeProps> = ({
  featuredProjectData,
  portfolioProject,
  projectNamesWithLinks,
}) => {
  return (
    <PageTemplate>
      <HeroSection />
      <AboutMeSection projectNamesWithLinks={projectNamesWithLinks} />
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
  const projectNamesWithLinks = getLinksandSlugs();

  return {
    props: {
      featuredProjectData,
      portfolioProject,
      projectNamesWithLinks,
    },
    revalidate: 1800,
  };
}

export default Home;
