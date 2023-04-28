import SectionTemplate from '../layout/SectionTemplate';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import StyledProjectContent from '../ui/StyledProjectContent';
import Grid from '@mui/material/Grid';

export interface IProject {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  dateCreated: string;
  isFeatured: boolean;
  stack: string[];
  codeExample?: string;
  codeExampleExplanation?: string;
  links?: string[];
}

const DUMMYDATA: IProject[] = [
  {
    id: '1',
    title: 'dummy title',
    summary:
      'this is the beautiful dummy summary which summarizes the dummy title',
    content:
      'there is a bunch of content, like a blog, but not on the featured page i tell ya',
    image: '/images/image_dp.jpg',
    author: 'dummy-authot',
    dateCreated: 'dummy-date',
    isFeatured: true,
    stack: ['1', '2', '3', '4', '5', '6'],
  },
  {
    id: '2',
    title: 'dummy title 2',
    summary:
      'there is a bunch of content, like a blog, but not on the featured page i tell ya nuero 2.Now lets see how we wil imopliment the overlfow.THis is imoortant because we gfeneruiaer dont know and if we have to we must becuse lorem serm. ',
    content:
      'there is a bunch of content, like a blog, but not on the featured page i tell ya nuero 2.Now lets see how we wil imopliment the overlfow.THis is imoortant because we gfeneruiaer dont know and if we have to we must becuse lorem serm. ',
    image: '/images/image_dp.jpg',
    author: 'dummy-authot2',
    dateCreated: 'dummy-date2',
    isFeatured: true,
    stack: ['1', '2', '3', '4', '5', '6', '7'],
  },
  {
    id: '3',
    title: 'dummy title 3',
    summary:
      'this is the beautiful dummy summary which summarizes the dummy title for 3',
    content:
      'there is a bunch of content, like a blog, but not on the featured page i tell ya nuero 3',
    image: '/images/image_dp.jpg',
    author: 'dummy-authot3',
    dateCreated: 'dummy-date3',
    isFeatured: false,
    stack: ['1', '2', '3', '4', '5', '6', '7'],
  },
];

//switch the order from LS box to RS box depending on the idx

const FeaturedProjectsSection = () => {
  const featuredHeading = 'Projects';

  return (
    <SectionTemplate heading={featuredHeading}>
      {DUMMYDATA.map((project, idx) => {
        const isOdd = idx % 2 === 1;
        return (
          <Grid
            container
            key={project.id}
            sx={{
              display: 'flex',
              flexDirection: isOdd ? 'row-reverse' : 'row',
              marginBottom: '4rem',
            }}
            spacing={2}
          >
            <Grid item xs={5}>
              <Paper elevation={3}>
                <Image src={project.image} alt="" width={400} height={300} />
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
              />
            </Grid>
          </Grid>
        );
      })}
    </SectionTemplate>
  );
};

export default FeaturedProjectsSection;
