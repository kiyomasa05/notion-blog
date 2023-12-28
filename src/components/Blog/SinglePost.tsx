import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  title: string;
  description: string;
  postedAt: string;
  updatedAt: string;
  slug: string;
  tags: string[];
};

function SinglePost(props: Props) {
  const { title, description, postedAt, updatedAt, slug, tags } = props;
  return (
    <section className="lg:w-1/2 bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
      <div>
        <div className="lg:flex items-center gap-6">
          <h2 className="text-gray-100 text-2xl font-medium mb-2">
            <Link href={`/posts/${slug}`}>{title}</Link>
          </h2>
          <div className="text-gray-100">投稿日：{postedAt}</div>
          <div className="text-gray-100">更新日：{updatedAt}</div>
        </div>
        <div>
          {tags.map((tag: string, index: number) => (
            <Link href="#" key={index}>
              <span className="text-white bg-gray-500 rounded-xl px-2 pb-0.5 font-medium mr-2">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <p className="text-gray-100">{description}</p>
    </section>
  );
}

export default SinglePost;
