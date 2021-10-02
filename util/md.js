import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((module) => module.Prism),
  { ssr: false }
);

const MdFormat = ({ markdown, ...props }) => {
  return (
    <ReactMarkdown
      {...props}
      children={markdown}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={dracula}
              language={match[1]}
              // PreTag='div'
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default MdFormat;
