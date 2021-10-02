import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((module) => module.Prism),
  { ssr: false }
);
// const dracula = dynamic(() => import('react-syntax-highlighter/dist/esm/styles/prism').then((module) => module.dracula), { ssr: false });

export const MdFormat = ({ markdown, ...props }) => {
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

export function CodeBlock({ language = null, value }) {
  return (
    <SyntaxHighlighter language={language} style={dracula}>
      {value}
    </SyntaxHighlighter>
  );
}

export function Markdown({ value, ...props }) {
  console.log("props", props);
  console.log("value", value);
  return (
    <ReactMarkdown
      children={value}
      renderers={{
        code: CodeBlock,
      }}
      {...props}
    />
  );
}
