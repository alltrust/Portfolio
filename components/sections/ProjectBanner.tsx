import Box from '@mui/material/Box';
import { IProject } from '../../types/app/Iproject';
import { transformDate } from '../../utils/transformDate';
import ProjectBannerImg from './ProjectBannerImg';
import ProjectBannerInfo from './ProjectBannerInfo';
import ProjectBannerTitle from './ProjectBannerTitle';

interface IProjectBanner {
  title: IProject['title'];
  author: IProject['author'];
  date: IProject['dateCreated'];
  image: IProject['image'];
  authorImage: string;
  readingTime: number;
}

const ProjectBanner = ({
  title,
  author,
  date,
  image,
  authorImage,
  readingTime,
}: IProjectBanner) => {

  const transformedDate = transformDate(date);

  return (
    <Box
      maxWidth="md"
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '5rem',
      }}
    >
      <ProjectBannerTitle title={title} />

      <ProjectBannerInfo
        readingTime={readingTime}
        transformedDate={transformedDate}
        authorImage={authorImage}
        author={author}
        title={title}
      />

      <ProjectBannerImg image={image} />
    </Box>
  );
};

export default ProjectBanner;
