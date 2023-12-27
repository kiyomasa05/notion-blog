import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { getSinglePost } from "../../../../lib/notionAPI";

const Post = async ({ params }: { params: { slug: string } }) => {
  if (!params || typeof params.slug !== "string") return notFound();

  const post = await getSinglePost(params.slug);

  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20">
      <h2 className="w-full text-2xl font-medium">{post.metadata.title}</h2>
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
          {tag}
        </p>
      ))}

      <div className="mt-10 font-medium">
        <ReactMarkdown>{post.markdown.parent}</ReactMarkdown>
      </div>
    </section>
  );
};

export default Post;
