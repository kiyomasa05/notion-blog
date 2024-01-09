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
  thumbnail: string;
  isPageNationPage: boolean;
};

function SinglePost(props: Props) {
  const {
    title,
    description,
    postedAt,
    updatedAt,
    slug,
    tags,
    thumbnail,
    isPageNationPage,
  } = props;

  return (
    <div>
      <section className="bg-rose-700 mb-8 w-48 h-60  mx-auto rounded-md shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300 relative lg:w-80 lg:h-80 ">
        <Link href={`/posts/${slug}`}>
          <img
            src={thumbnail}
            className="w-full h-32 m-0 rounded-t-md lg:h-40 hover:opacity-70 transition-all duration-300"
          />
        </Link>

        <div className="p-1 lg:p-3">
          <div className="items-center gap-3">
            <div className="text-slate-100 text-xs">投稿日：{postedAt}</div>
            <h2 className="text-slate-50 text-sm font-medium border-none lg:text-base lg:font-bold hover:text-red-400 duration-300">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
          </div>
          <div className="absolute bottom-2 left-2 lg:bottom-3 lg:left-4">
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <span className="text-white bg-gray-500 rounded-xl px-2 pb-0.5 font-medium text-xs mr-2">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SinglePost;
