import Box from '@mui/material/Box';
import { IAboutMeData } from '../../types/app/IAboutMeData';
import MarkdownComponent from '../markdown-content';
import NextImage from 'next/image';

interface IAboutContent {
  aboutMeData: IAboutMeData;
}

const AboutContent = ({ aboutMeData }: IAboutContent) => {
const {content, image} = aboutMeData

  return (
    <>
    <Box sx={{textAlign: 'center'}}>
      <NextImage src={`/images/about/${image}`} alt='pilxated dislay picture' width={300} height={400}/>
    </Box>
    <Box>
      <MarkdownComponent content={content} />
    </Box>
    </>
  );
};

export default AboutContent;
