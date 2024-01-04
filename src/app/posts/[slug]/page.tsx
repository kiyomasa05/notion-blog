import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { MdCached, MdAccessTime } from "react-icons/md";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { getSinglePost } from "../../../../lib/notionAPI";

export const revalidate = 60 * 60 * 3;

// マークダウンを加工する
const customCode = (props: any) => {
  const { children, className } = props;
  const match = /language-(\w+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";
  //言語がabapならiframeとして、ブログカードを返す
  if (lang === "abap") {
    return (
      <iframe
        className="mx-auto w-full max-w-7xl dark:opacity-80"
        src={`https://hatenablog-parts.com/embed?url=${children}`}
      />
    );
  }
  //言語があればシンタックスハイライトとして返す
  return match ? (
    <SyntaxHighlighter PreTag="div" language={match[1]} style={vscDarkPlus}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code>{children}</code>
  );
};
const articleComponents = {
  code: customCode,
};

const Post = async ({ params }: { params: { slug: string } }) => {
  if (!params || typeof params.slug !== "string") return notFound();

  const post = await getSinglePost(params.slug);

  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-3/5 mx-auto mt-24">
      <img
        src={post.metadata.thumbnail}
        alt="thunbnail"
        className="max-h-60 lg:max-h-80"
      />
      <h1 className="w-full text-2xl font-medium mt-5 border-none">
        {post.metadata.title}
      </h1>
      <div className="border-b-2 w-2/3  mt-1 border-sky-900"></div>
      <div className="mb-0 pb-0 flex justify-between">
        <span className="text-gray-500 flex items-center">
          <MdAccessTime className="mr-1" /> {post.metadata.postedAt}
        </span>
        <span className="text-gray-500 flex items-center">
          <MdCached className="mr-1" />
          {post.metadata.updatedAt}
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
        <Markdown components={ articleComponents }>
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
function code(props: any) {
  throw new Error("Function not implemented.");
}
