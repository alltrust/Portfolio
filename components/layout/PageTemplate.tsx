import { ReactNode } from 'react';
import Contact from '../sections/Contact';

interface IPageTemplate{
  children: ReactNode | ReactNode[]
}

const PageTemplate = ({children}:IPageTemplate) => {
  return (
    <>
      {children}
      <Contact/>
    </>
  );
};

export default PageTemplate;
