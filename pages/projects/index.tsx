import { NextPage } from 'next/types';
import AllProjectsSection from '../../components/sections/AllProjects';
import { IProject } from '../../types/app/Iproject';
import { getAllProjects } from '../../lib/fetch-project';

interface IAllProjectsPageProps {
  allProjects: IProject[];
}

const AllProjectsPage: NextPage<IAllProjectsPageProps> = ({ allProjects }) => {
  
  return <AllProjectsSection allProjects={allProjects} />;
};

export async function getStaticProps() {
  const allProjects = getAllProjects(); 

  return {
    props: {
      allProjects,
    },
  };
}

export default AllProjectsPage;
