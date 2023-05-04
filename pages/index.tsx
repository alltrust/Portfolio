import type { NextPage } from 'next';
import HeroSection from '../components/sections/Hero';
import SeperatorLine from '../components/ui/SeperationLine';
import Test from '../components/ui/navigation/DELETEME';
import ContactSection from "../components/sections/Contact"
import FeaturedProjectsSection from '../components/sections/FeaturedProjects';
import { IProject } from '../types/app/Iproject';
import AboutSection from '../components/sections/About';
import InfoSection from "../components/sections/Info"
import { getFeaturedProjects } from '../lib/fetch-project';

interface IHomeProps {
  featuredProjectData: IProject[]
}


const Home: NextPage<IHomeProps> = ({featuredProjectData}) => {
//dispatch context to store the featuredProjectData in the 


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
      <HeroSection />
      <SeperatorLine />
      <InfoSection/>
      <AboutSection />
      <FeaturedProjectsSection featuredData={featuredProjectData} />
      <ContactSection/>
      {/* <Portal>
        <ContactModal/>
      </Portal> */}
      <Test />
    </>
    // </StyledPage>
  );
};


export async function getStaticProps(){
  //here we want to fetch projectData with isFeature === true;
  //pass it as props to the home page for pre-rendering... pass it to the featuredProject section... or use context?
  const featuredProjectData = getFeaturedProjects()

  return{
    props:{
      featuredProjectData
    },
    revalidate: 1800,
  }

}

export default Home;
