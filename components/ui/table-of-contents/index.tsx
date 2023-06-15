import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

interface ITableOfContents {
  title: string;
  headings: RegExpMatchArray | null;
}

const TableOfContents = ({ title, headings }: ITableOfContents) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'fixed' }}>
      <Typography component="h5" variant="body1" sx={{ fontWeight: 600 }}>
        On This Page
      </Typography>
      <List>
        <ListItem>
          <Link href={'#'}>{title}</Link>
        </ListItem>
        {headings?.map((header, idx) => {
          const firstWhiteSpace = header.indexOf(' ');
          const isLevelFourHeader = firstWhiteSpace === 4;
          const headerName = header.slice(firstWhiteSpace + 1);
          const headerHref = headerName.replace(' ', '-').toLowerCase();

          return (
            <ListItem key={`${header}-${idx}`}>
              <Link
                href={`#${headerHref}`}
                underline="none"
                color={
                  isLevelFourHeader
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary
                }
                marginLeft={isLevelFourHeader ? 0 : '1rem'}
                onClick={() => console.log(`#${headerHref}`)}
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
