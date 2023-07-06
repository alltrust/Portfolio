import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import NextImage from 'next/image';
import { useTheme } from '@mui/material/styles';
import { IInitialIconFocusValues } from '../../../types/app/IInitialIconFocusValues';
import ProjectSkillList from './ProjectSkillList';

interface ISkillSlideWIthTimeDislay {
  iconFocused: IInitialIconFocusValues;
}
const SkillSlideWithTimeDisplay = ({
  iconFocused,
}: ISkillSlideWIthTimeDislay) => {
  const theme = useTheme();

  const { isFocused, svg, svgForDark, timeSince } = iconFocused;

  //on tech svg click, getProjectWithStack, and map through the project stacks
  //return the project names and the links (article, github, deployed) with said tech stacks, and render via projectSkillList
  //perhaps include in context!

  return (
    <Slide direction="right" in={isFocused}>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          color: theme.palette.text.primary,
          padding: '2%',
          backgroundColor:
            theme.palette.mode !== 'dark' ? '#d1d1f5' : '#18181a',
          minWidth: '300px',
          margin: '15px',
        }}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          {svg !== '' && svgForDark !== '' ? (
            <NextImage
              src={
                theme.palette.mode === 'dark' && svgForDark ? svgForDark : svg
              }
              alt={'icon'}
              width={20}
              height={20}
            />
          ) : null}

          <Typography
            component="h6"
            variant="body1"
            color={theme.palette.text.primary}
            alignSelf={'center'}
          >
            {timeSince !== '' && timeSince}
          </Typography>
        </Box>
        {isFocused ? <ProjectSkillList /> : null}
      </Paper>
    </Slide>
  );
};
export default SkillSlideWithTimeDisplay;
