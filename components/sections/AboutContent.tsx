import Box from '@mui/material/Box';
import { IAboutMeData } from '../../types/app/IAboutMeData';
import MarkdownComponent from '../markdown-content';
import NextImage from 'next/image';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface IAboutContent {
  aboutMeData: IAboutMeData;
}

const AboutContent = ({ aboutMeData }: IAboutContent) => {
  const { content, image } = aboutMeData;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <NextImage
          src={`/images/about/${image}`}
          alt="pilxated dislay picture"
          width={300}
          height={400}
        />
      </Box>
      <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
        <MarkdownComponent content={content} />
      </Box>
    </>
  );
};

export default AboutContent;
