import { GetStaticProps, NextPage } from 'next';
import ProjectContent from '../../components/sections/ProjectContent';
import {
  getFileNames,
  getProjectByIdentifier,
  removeFileExt,
} from '../../lib/fetch-project';
import { IProject } from '../../types/app/Iproject';
import PageTemplate from '../../components/layout/PageTemplate';

interface ISingleProjectPageProps {
  project: IProject;
}

const SingleProjectPage: NextPage<ISingleProjectPageProps> = ({ project }) => {

  return (
    <PageTemplate>
      <ProjectContent project={project} />
    </PageTemplate>
  );
};

export const getStaticProps: GetStaticProps<{ project: IProject }> = async (
  context
) => {
  const { params } = context;
  const slug = params?.slug;
  const slugString = slug?.toString() || '';
  const project = getProjectByIdentifier(slugString);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
    },
    revalidate: 3600,
  };
};

export async function getStaticPaths() {
  const fileNames = getFileNames();

  const slugs = fileNames.map((file) => {
    return removeFileExt(file);
  });

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

// export async function getStaticPaths(){

//   //if we have 1000s of posts and much of those projects or blogs are rarely visited
//   // at which point we need to require a fallback in case
//   return {
//     paths: [],
//     fallback:'blocking'
//   }
// }

export default SingleProjectPage;
