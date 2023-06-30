import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import Typography from '@mui/material/Typography';
import StrongRenderer from './renderers/StrongRenderer';
import CustomHeading from './renderers/CustomHeading';
import ImageRenderer from './renderers/ImageRenderer';
import CodeRenderer from './renderers/CodeRenderer';
import LinkRenderer from './renderers/LinkRenderer';

interface IMarkdownComponent {
  content: string;
}

const MarkdownComponent = ({ content }: IMarkdownComponent) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
        h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
        h3: ({ children }) => {
          return <CustomHeading variant={'h3'}>{children}</CustomHeading>;
        },
        h4: ({ children }) => {
          return <CustomHeading variant={'h4'}>{children}</CustomHeading>;
        },
        h5: ({ children }) => <Typography variant="h5">{children}</Typography>,
        h6: ({ children }) => <Typography variant="h6">{children}</Typography>,
        p: (paragraph: { children: ReactNode & ReactNode[]; node?: any }) => {
          return <ImageRenderer paragraph={paragraph} />;
        },

        code: ({ inline, className, children }) => {
          return (
            <CodeRenderer inline={inline} className={className} >
              {children}
            </CodeRenderer>
          );
        },
        a: ({ href, children }) => {
          return <LinkRenderer href={href}>{children}</LinkRenderer>;
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
