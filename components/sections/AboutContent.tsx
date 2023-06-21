import Box from '@mui/material/Box';
import { IAboutMeData } from '../../types/app/IAboutMeData';
import MarkdownComponent from '../markdown-content';

interface IAboutContent {
  aboutMeData: IAboutMeData;
}

const AboutContent = ({ aboutMeData }: IAboutContent) => {
const {content} = aboutMeData

  return (
    <Box>
      <MarkdownComponent content={content} />
    </Box>
  );
};

export default AboutContent;
