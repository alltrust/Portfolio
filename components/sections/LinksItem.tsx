import { IProject } from '../../types/app/Iproject';
import Link from 'next/link';
import Box from '@mui/material/Box';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { useTheme } from '@mui/material';
import MotionButton from '../ui/MotionButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { getSiteName } from '../../utils/getSiteName';

interface ILinkItem {
  slug: IProject['slug'];
  links: IProject['links'];
}

const LinksItem = ({ slug, links }: ILinkItem) => {
  const theme = useTheme();

  return (
    <Box display={'flex'}>
      <Link href={`/projects/${slug}`}>
        <MotionButton>
          <WysiwygIcon sx={{ color: theme.palette.secondary.dark }} />
        </MotionButton>
      </Link>

      {links?.map((link) => {
        const siteName = getSiteName(link);

        return (
          <MotionButton key={link}>
            <a target="_blank" rel="noopener noreferrer" href={link}>
              {siteName === 'github' ? (
                <GitHubIcon sx={{ color: theme.palette.secondary.dark }} />
              ) : (
                <ArrowOutwardIcon
                  sx={{ color: theme.palette.secondary.dark }}
                />
              )}
            </a>
          </MotionButton>
        );
      })}
    </Box>
  );
};

export default LinksItem;
