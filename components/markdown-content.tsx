import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugHeadingText } from "@/lib/content";

type MarkdownContentProps = {
  source: string;
};

export function MarkdownContent({ source }: MarkdownContentProps) {
  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => {
            const id = slugHeadingText(children);
            return <h2 id={id}>{children}</h2>;
          },
          h3: ({ children }) => {
            const id = slugHeadingText(children);
            return <h3 id={id}>{children}</h3>;
          }
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
