import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface IMarkdownComponent {
  content: string;
}

const MarkdownComponent = ({ content }: IMarkdownComponent) => {
  const StyledImgWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    background: red;
  `;
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
        h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
        h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
        h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
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
          return <Typography variant="body1">{paragraph.children}</Typography>;
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
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownComponent;
