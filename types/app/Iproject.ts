export interface IProject {
    slug: string;
    title: string;
    summary: string;
    content: string;
    image: string;
    author: string;
    dateCreated: string;
    isFeatured: boolean;
    stack: string[];
    subHeading: string;
    codeExample?: string;
    codeExampleExplanation?: string;
    links?: string[];
  }