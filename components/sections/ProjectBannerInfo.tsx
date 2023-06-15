import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NextImage from 'next/image';
import { useTheme } from '@mui/material';
import { IProject } from '../../types/app/Iproject';

interface IProjectBannerInfo {
  authorImage: string;
  title: IProject['title'];
  author: IProject['author'];
  transformedDate: string;
  readingTime: number

}

const ProjectBannerInfo = ({ authorImage, title, author, transformedDate, readingTime }:IProjectBannerInfo) => {
  const theme = useTheme();



  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      <NextImage
        src={authorImage}
        alt={title}
        width={100}
        height={100}
        style={{
          objectFit: 'cover',
          borderRadius: '100%',
          marginRight: '2rem',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItem: 'baseline',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ color: theme.palette.text.secondary }}>
          Creator{' '}
          <Typography
            component="span"
            sx={{ color: theme.palette.primary.main }}
          >
            {author}
          </Typography>
        </Typography>
        <Typography sx={{ color: theme.palette.text.secondary }}>
          Published on{' '}
          <Typography component="span">{transformedDate} · </Typography>
          <Typography component="span">{readingTime} minute read</Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default ProjectBannerInfo;
