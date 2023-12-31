import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { getSinglePost } from "../../../../lib/notionAPI";

export const revalidate = 60 * 60 * 3;

const Post = async ({ params }: { params: { slug: string } }) => {
  if (!params || typeof params.slug !== "string") return notFound();

  const post = await getSinglePost(params.slug);

  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto">
      <img src={post.metadata.thumbnail} alt="thunbnail" />
      <h2 className="w-full text-2xl font-medium mt-5">
        {post.metadata.title}
      </h2>
      <div className="border-b-2 w-1/3  mt-1 border-sky-900"></div>
      <div className="mb-0 pb-0 flex justify-between">
        <span className="text-gray-500 block">
          Posted date at {post.metadata.postedAt}
        </span>
        <span className="text-gray-500 block">
          Updated date at {post.metadata.updatedAt}
        </span>
      </div>
      {post.metadata.tags.map((tag: String, index: number) => (
        <p
          key={index}
          className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2"
        >
          <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
        </p>
      ))}

      <div className="mt-10 font-medium">
        <Markdown
          components={{
            code(props) {
              const { children, className, node } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  language={match[1]}
                  style={vscDarkPlus}
                  showLineNumbers={true}
                  wrapLongLines={true}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code>{children}</code>
              );
            },
          }}
        >
          {post.markdown.parent}
        </Markdown>
        <Link href="/">
          <span className="pb-20 block mt-3 text-sky-900">←ホームに戻る</span>
        </Link>
      </div>
    </section>
  );
};

export default Post;
