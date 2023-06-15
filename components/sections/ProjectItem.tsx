import { IProject } from '../../types/app/Iproject';
import Image from 'next/image';
import NextLink from 'next/link';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

interface IProjectItem {
  image: IProject['image'];
  title: IProject['title'];
  author: IProject['author'];
  date: IProject['dateCreated'];
  slug: IProject['slug']
};

//consider switching this to grid item with different components

const ProjectItem = ({ image, title, author, date, slug }: IProjectItem) => {
    //we may have to pass in the slug as well from the page 
    //this way we can directly access the imagePath which may have to be
    //created based on how it is stored in db...

    //example used in course in /images/slug/image
    
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const subheading = `${author} | ${formattedDate} `

  return (
    <ImageListItem sx={{ margin: '16px' }}>
      <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
      <NextLink href={`/projects/${slug}`}>
        <ImageListItemBar
          title={title}
          subtitle={subheading}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${title}`}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </NextLink>
    </ImageListItem>
  );
};

export default ProjectItem;
