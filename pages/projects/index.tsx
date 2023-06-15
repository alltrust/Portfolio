import { NextPage } from 'next/types';
import AllProjectsSection from '../../components/sections/AllProjects';
import { IProject } from '../../types/app/Iproject';
import { getAllProjects } from '../../lib/fetch-project';
import PageTemplate from '../../components/layout/PageTemplate';

interface IAllProjectsPageProps {
  allProjects: IProject[];
}

const AllProjectsPage: NextPage<IAllProjectsPageProps> = ({ allProjects }) => {
  return (
    <PageTemplate>
      <AllProjectsSection allProjects={allProjects} />
    </PageTemplate>
  );
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
