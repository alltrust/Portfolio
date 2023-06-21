import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { removeFileExt } from './fetch-project';
import { IAboutMeData } from '../types/app/IAboutMeData';

const aboutMeDirectory = path.join(process.cwd(), '/utils/about');

export const getAboutMeName = () => {
  const aboutMeFile = fs.readdirSync(aboutMeDirectory);

  return aboutMeFile;
};

const getAboutMeData = (fileName: string) => {
  const filePath = path.join(aboutMeDirectory, fileName);
  const aboutMeContent = fs.readFileSync(filePath, 'utf-8');

  const { content } = matter(aboutMeContent);
  const projectSlug = removeFileExt(fileName);

  const aboutMeData: IAboutMeData = {
    slug: projectSlug,
    content: content,
  };

  return aboutMeData;
};

export const getAboutMePost = () => {
  const aboutMeFiles = getAboutMeName();

  const allAboutMeData = aboutMeFiles.map((file) => {
    return getAboutMeData(file);
  });

  return allAboutMeData;
};

export const getAboutMeWithIdentifier = (slug: string) => {
    const allPosts = getAboutMePost();
  
    const posts = allPosts.find((post) => {
      return post.slug === slug;
    });
  
    return posts;
  };
  