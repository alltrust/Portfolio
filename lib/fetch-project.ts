//functions that fetch all posts, allfeatured posts, individual posts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { IProject } from '../types/app/Iproject';

//refactor

const projectDirectory = path.join(process.cwd(), 'projects');

export const removeFileExt = (fileName: string) => {
  return fileName.replace(/\.md$/, '');
};

export const getFileNames = () => {
  const projectFiles = fs.readdirSync(projectDirectory);

  return projectFiles;
};

const getProjectData = (fileName: string) => {
  const filePath = path.join(projectDirectory, fileName);
  const projectContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(projectContent);
  const projectSlug = removeFileExt(fileName);

  const projectData: IProject = {
    slug: projectSlug,
    title: data.title,
    summary: data.summary,
    image: data.image,
    author: data.author,
    dateCreated: data.dateCreated,
    isFeatured: data.isFeatured,
    stack: data.stack,
    content: content,
    subHeading: data.subHeading,
    links: data.links,
  };

  return projectData;
};

export const getAllProjects = () => {
  const projectFiles = getFileNames();

  const allProjectsData = projectFiles.map((file) => {
    return getProjectData(file);
  });

  const sortedPosts = allProjectsData.sort((projectA, projectB) => {
    return projectA.dateCreated > projectB.dateCreated ? -1 : 1;
  });

  return sortedPosts;
};

export const getFeaturedProjects = () => {
  const allProjects = getAllProjects();

  const allFeaturedProjects = allProjects.filter((project) => {
    return project.isFeatured === true;
  });

  return allFeaturedProjects;
};

export const getProjectByIdentifier = (slug: string) => {
  const allProjects = getAllProjects();

  const project = allProjects.find((project) => {
    return project.slug === slug;
  });

  return project;
};

export const getPortfolioProject = () => {
  const allProjects = getAllProjects();

  const portfolioProjects = allProjects.filter((project) => {
    return project.isFeatured === false && project.title === 'Next Portfolio';
  });

  return portfolioProjects[0];
};

export const getLinksandSlugs = () => {
  const allProjects = getAllProjects();

  const projectNamesWithLinks = allProjects.map((project) => {
    return {
      name: project.title,
      links: project.links,
      slug: project.slug,
      stack: project.stack,
    };
  });
  return projectNamesWithLinks;
};
