import SectionTemplate from '../layout/SectionTemplate';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import StyledProjectContent from '../ui/StyledProjectContent';
import Grid from '@mui/material/Grid';
import { DUMMYDATA } from '../../context/dummy-data/dummy';
import { IProject } from '../../types/app/Iproject';



//switch the order from LS box to RS box depending on the idx

interface IFeaturedProjectSection{
  featuredData: IProject[]
}

const FeaturedProjectsSection = ({featuredData}:IFeaturedProjectSection) => {

//dispatch featured Projects

  const featuredHeading = 'Projects';

  //EDGE CASE: if there are no dummy data or no feautured === true projects
  //include link to project/slug as well for the item with links

  return (
    <SectionTemplate heading={featuredHeading}>
      {featuredData.map((project, idx) => {
        if (project.isFeatured === true) {
          const isOdd = idx % 2 === 1;
          return (
            <Grid
              container
              key={project.slug}
              sx={{
                display: 'flex',
                flexDirection: isOdd ? 'row-reverse' : 'row',
                marginBottom: '4rem',
              }}
              spacing={2}
            >
              <Grid item xs={5}>
                <Paper elevation={3}>
                  <Image src={`/images/projects/${project.image}`} alt="" width={400} height={300} />
                </Paper>
              </Grid>
              <Grid
                item
                xs={7}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}
              >
                <StyledProjectContent
                  title={project.title}
                  summary={project.summary}
                  stack={project.stack}
                  slug={project.slug}
                  links={project.links}
                />
              </Grid>
            </Grid>
          );
        };
      })}
    </SectionTemplate>
  );
};

export default FeaturedProjectsSection;
