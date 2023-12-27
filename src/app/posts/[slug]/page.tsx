import { triggerAsyncId } from "async_hooks";
import { notFound } from "next/navigation";
import React from "react";
import { getSinglePost } from "../../../../lib/notionAPI";

const Post = async ({ params }: { params: { slug: string } }) => {
  if (!params || typeof params.slug !== "string") return notFound();

  const post = await getSinglePost(params.slug);
  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20">
      <h2 className="w-full text-2xl font-medium">{post.metadata.title}</h2>
      <div className="border-b-2 w-1/3  mt-1 border-sky-900"></div>
      <span className="text-gray-500">Posted date at {post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag: String, index: number) => (
        <p
          key={index}
          className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2"
        >
          {tag}
        </p>
      ))}

      {/* <div className="mt-10 font-medium">{post.markdown}</div> */}
    </section>
  );
};

export default Post;
