import { notFound } from "next/navigation";
import React from "react";
import { getSinglePost } from "../../../../lib/notionAPI";

const Post = async ({ params }: { params: { slug: string } }) => {
  if (!params || typeof params.slug !== "string") return notFound();

  const post = await getSinglePost(params.slug);
  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20">
      <h2 className="w-full text-2xl font-medium">{post.title}</h2>
      <div className="border-b-2 w-1/3  mt-1 border-sky-900"></div>
      <span className="text-gray-500">{post.date}</span>
      <br />
      <p className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block">
        next.js
      </p>
      <div className="mt-10 font-medium">aaaaaa</div>
    </section>
  );
};

export default Post;
