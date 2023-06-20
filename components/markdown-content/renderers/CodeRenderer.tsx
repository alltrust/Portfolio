
import { ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface ICodeRenderer{
    node?: any,
    inline: boolean | undefined;
    className: string | undefined;
    children: ReactNode & ReactNode[]
}

const CodeRenderer = ({ node, inline, className, children, ...props}:ICodeRenderer)=>{
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
};

export default CodeRenderer;