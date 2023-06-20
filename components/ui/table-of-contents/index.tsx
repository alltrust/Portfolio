import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import useAppContext from '../../../hooks/useAppContext';
import { useTheme} from '@mui/material';

interface ITableOfContents {
  title: string;
  headings: RegExpMatchArray | null;
}

const TableOfContents = ({ title, headings }: ITableOfContents) => {
  const { state } = useAppContext();
  const { blogSubheadingId } = state;
  const theme = useTheme();

  return (
    <Box sx={{ position: 'fixed', marginTop: '6rem' }}>
      <Typography component="h5" variant="body1" sx={{ fontWeight: 600 }}>
        On This Page | <Link href={'#'}>{title}</Link>
      </Typography>
      <List>
        {headings?.map((header, idx) => {
          const firstWhiteSpace = header.indexOf(' ');
          const isLevelFourHeader = firstWhiteSpace === 4;
          const headerName = header.slice(firstWhiteSpace + 1);
          const headerHref = headerName.replaceAll(' ', '-').toLowerCase();
          const isHeadingInView = blogSubheadingId === headerHref;
          return (
            <ListItem key={`${header}-${idx}`}>
              <Link
                href={`#${headerHref}`}
                underline="none"
                marginLeft={isLevelFourHeader ? '1rem' : '0'}
                color={
                  isHeadingInView
                    ? theme.palette.secondary.contrastText
                    : theme.palette.text.primary
                }
                sx={{
                  transform: isHeadingInView ? 'scale(1.15)' : 'none',
                  transition: 'transform 0.3s ease-in-out',
                  fontSize: '14px'
                }}
              >
                {headerName}
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default TableOfContents;
