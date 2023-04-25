import type { NextPage } from 'next';
import HeroHeader from '../components/layout/HeroHeader';
import Seperator from '../components/ui/ContentSeperator/Seperator';
import Container from '@mui/material/Container';
import Test from '../components/ui/NavigationAppBar/DELETEME'

const Home: NextPage = ({}) => {
  //perhaps include a fullscreen modal/ overlay to welcome to page
  //dark theme and light theme mode and toggle
  //navigation to differnt page section
  //page sections would include:
  //about me
  //currently working on projects
  //all projects
  // contact info
  //contact modal
  //resume
  //links

  //include an AppBar
  //get a font for typography

  //mainHeader component with
  //title
  //subtitle
  //quick detail of me
  //image

  //about me full section
  //who i am, interest, stacks i know
  //projects im working on

  //projects
  //coming soon projects
  //each project will haVe github link
  //a subpage where I can explain the:
  //application of project
  //limitations of project
  //stack of project
  //breakdown of project
  //preview of how it works
  //*maybe private comments to projects
  //*maybe a blog sections of specific things ive learned

  return (
    // <StyledPage>
    <>
      <Container
        sx={{ height: '90vh', display: 'flex', alignItems: 'center' }}
      >
        <HeroHeader />
      </Container>
      <Seperator />
      <Test/>
    </>
    // </StyledPage>
  );
};

export default Home;
