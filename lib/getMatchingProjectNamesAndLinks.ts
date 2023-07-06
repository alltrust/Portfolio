import { IProject } from '../types/app/Iproject';

export interface IProjectNamesWithLinks {
  name: IProject['title'];
  links: IProject['links'];
  slug: IProject['slug'];
  stack: IProject['stack'];
}

export const getMatchingProjectNamesAndLinks = (
  projectNamesWithLinks: IProjectNamesWithLinks[],
  focusedTechSkill: string
) => {
  const namesAndLinksArr: {
    name: string;
    slug: string;
    links: string[];
  }[] = [];

  projectNamesWithLinks.forEach((namesWithLinks) => {
    const matchingProjects = namesWithLinks.stack.map((tech) => {
      if (tech.toLocaleLowerCase() === focusedTechSkill?.toLocaleLowerCase()) {
        return {
          name: namesWithLinks.name,
          slug: namesWithLinks.slug,
          links: namesWithLinks.links,
        };
      }
      return null;
    });

    matchingProjects.forEach((project) => {
      if (project !== null) {
        namesAndLinksArr.push(project);
      }
    });
  });
  return namesAndLinksArr;
};
