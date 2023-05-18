import SectionTemplate from '../layout/SectionTemplate';
import Project from './Project';
import { IProject } from '../../types/app/Iproject';

interface IFeaturedProjectSection {
  featuredData: IProject[];
}

const FeaturedProjectsSection = ({ featuredData }: IFeaturedProjectSection) => {

  return (
    <>
      {featuredData.map((project) => (
        <SectionTemplate heading={project.title} key={project.slug}>
          <Project project={project} />
        </SectionTemplate>
      ))}
    </>
  );
};

export default FeaturedProjectsSection;
