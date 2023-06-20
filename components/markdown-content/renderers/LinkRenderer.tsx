import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface ILinkRenderer {
  href: string | undefined;
  children: ReactNode & ReactNode[];
}

const LinkRenderer = ({ href, children }: ILinkRenderer) => {
  const theme = useTheme();

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: theme.palette.secondary.contrastText,
          fontWeight: 600,
        }}
      >
        {children}
      </a>
    );
  }
  return null;
};

export default LinkRenderer;
