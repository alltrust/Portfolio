import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useTheme } from '@mui/material';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import StrongRenderer from './renderers/StrongRenderer';
import SeperatorLine from '../ui/SeperationLine';

interface IMarkdownComponent {
  content: string;
}

const MarkdownComponent = ({ content }: IMarkdownComponent) => {
  const theme = useTheme();

  const StyledImgWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    background: red;
  `;

  const createHref = (
    hrefString: string[] | string | ReactNode | ReactNode[]
  ) => {
    return hrefString?.toString().replace(' ', '-').toLowerCase();
  };

  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
        h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
        h3: ({ children }) => {
          const headerHref = createHref(children);
          return (
            <>
            <SeperatorLine id={`${headerHref}`}/>
              <Typography
                id={`${headerHref}`}
                variant="h3"
                sx={{
                  marginTop: theme.spacing(4),
                  marginBottom: theme.spacing(8),
                }}
              >
                {children}
              </Typography>
            </>
          );
        },
        h4: ({ children }) => {
          const headerHref = createHref(children);

          return (
            <>
            <SeperatorLine id={`${headerHref}`}/>
            <Typography
              id={`${headerHref}`}
              variant="h4"
              sx={{
                marginTop: theme.spacing(4),
                marginBottom: theme.spacing(6),
              }}
            >
              {children}
            </Typography>
            </>
          );
        },
        h5: ({ children }) => <Typography variant="h5">{children}</Typography>,
        h6: ({ children }) => <Typography variant="h6">{children}</Typography>,
        p: (paragraph: { children: ReactNode & ReactNode[]; node?: any }) => {
          const { node } = paragraph;

          if (node.children[0].tagName === 'img') {
            const image = node.children[0];
            const metastring = image.properties.alt;
            const alt = metastring?.replace(/ *\{[^)]*\} */g, '');
            const hasCaption = metastring?.toLowerCase().includes('{caption:');
            const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

            return (
              <StyledImgWrapper>
                <Image
                  src={image.properties.src}
                  width={400}
                  height={300}
                  className="postImg"
                  alt={alt}
                  style={{ objectFit: 'cover' }}
                />
                {hasCaption ? (
                  <Typography variant="body2" aria-label={caption}>
                    {caption}
                  </Typography>
                ) : null}
              </StyledImgWrapper>
            );
          }
          return (
            <>
              <br />
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary }}
              >
                {paragraph.children}
              </Typography>
              <br />
            </>
          );
        },

        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              {...props}
              style={tomorrow}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className={className}
              {...props}
              style={{
                backgroundColor: 'lightgray',
                padding: '0.2em',
                borderRadius: '0.2em',
                color: 'black',
                marginTop: '0.2em',
              }}
            >
              {children}
            </code>
          );
        },
        a: ({ href, children }) => {
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
        },
        strong: ({ children }) => {
          return <StrongRenderer>{children}</StrongRenderer>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownComponent;
