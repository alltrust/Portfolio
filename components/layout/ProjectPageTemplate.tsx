import Container from '@mui/material/Container';
import ProjectBanner from '../sections/ProjectBanner';
import ProjectContent from '../sections/ProjectContent';


//takes in all project content
//this is practically the project/[slug] page 
const PageTemplate = () => {
  //image banner

  // title
  //author
  //date created
  //last edited

  //Blog

  //deployed link
  //github repo
  // create side link on each page and a breakdown of the code distribution

  //** highlighted text for code expansion */
  return (
    <Container>
      <ProjectBanner />
      <ProjectContent />
    </Container>
  );
};

export default PageTemplate;
