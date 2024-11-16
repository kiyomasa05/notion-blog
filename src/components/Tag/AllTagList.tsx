import Link from "next/link";
import React from "react";

type Props = {
  tags: string[];
};
// もう一つ、タグをpage側のheadと、最後にもたす
// 日本語のタグが文字化けしてしまうのも解消
export const AllTagList = async (props: Props) => {
  const { tags } = props;
  return (
    <div className="mx-4">
      <section className="lg:w-2/3 mb-8 mx-auto bg-slate-50 rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 duration-300 transition-all">
        <div className="font-medium mb-4">タグ検索</div>
        <div className="flex flex-wrap md:gap-4 gap-1">
          {tags.map((tag, index) => (
            <Link key={index} href={`/posts/tag/${tag}/page/1`}>
              <span className="cursor-pointer px-2 pb-1 rounded-md bg-slate-200 text-black inline-block">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllTagList;
