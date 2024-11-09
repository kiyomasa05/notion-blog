import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { MdCached, MdAccessTime } from "react-icons/md";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { getSinglePost } from "../../lib/notionAPI";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

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

// metadataを動的に取得
// DOCS:https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getSinglePost((await params).slug); //params が Promise の場合、待機して解決された値を取得
  const metadata: Metadata = {
    title: post?.metadata.title,
    description: post?.metadata.description,
    keywords: post?.metadata.tags,
  };
  return metadata;
}

const Post = async ({ params, searchParams }: Props) => {
  if (!params || typeof (await params).slug !== "string") return notFound();

  const post = await getSinglePost((await params).slug);

  return (
    <div>
      <section className="container lg:px-2 px-5 h-screen w-dvw lg:w-3/5 mx-auto mt-24">
        <Image
          src={`/api/og?title=${post?.metadata.title}`}
          className="max-h-60 lg:max-h-80"
          width={600}
          height={500}
          alt={"サムネイル"}
        />
        <h1 className="w-full text-2xl font-medium mt-5 border-none">
          {post?.metadata.title}
        </h1>
        <div className="border-b-2 w-2/3  mt-1 border-sky-900"></div>
        <div className="mb-0 pb-0 flex justify-between">
          <span className="text-gray-500 flex items-center">
            <MdAccessTime className="mr-1" /> {post?.metadata.postedAt}
          </span>
          <span className="text-gray-500 flex items-center">
            <MdCached className="mr-1" />
            {post?.metadata.updatedAt}
          </span>
        </div>
        {post?.metadata.tags.map((tag: String, index: number) => (
          <p
            key={index}
            className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2"
          >
            <Link href={`/posts/tag/${tag}/page/1`} className="text-white">
              {tag}
            </Link>
          </p>
        ))}

        <div className="mt-10 font-medium">
          <Markdown components={articleComponents}>
            {post?.markdown.parent}
          </Markdown>
          <Link href="/">
            <span className="pb-20 block mt-3 text-sky-900">←ホームに戻る</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Post;
