import { IProject } from '../../types/app/Iproject';
import Link from 'next/link';
import Box from '@mui/material/Box';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { useTheme } from '@mui/material';
import MotionButton from '../ui/MotionButton';

interface ILinkItem {
  slug: IProject['slug'];
  links: IProject['links'];
}

//render deployment and git icons and

// return all links for github and deployment as well as link for THAT page;
const LinksItem = ({ slug, links }: ILinkItem) => {
  const theme = useTheme();

  return (
    <Box>
        <Link href={`/projects/${slug}`}>
          <MotionButton>
            <WysiwygIcon sx={{ color: theme.palette.secondary.dark }} />
          </MotionButton>
        </Link>
      {links?.map((link) => {
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            key={link}
            href={link}
          >
            external Link
          </a>
        );
      })}
    </Box>
  );
};

export default LinksItem;
