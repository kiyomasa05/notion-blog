import Link from "next/link";
import { getAllTags, getPostsForTopPage } from "../../lib/notionAPI";
import { BLOG_TITLE } from "./constants/constans";
import SinglePost from "@/components/Blog/SinglePost";
import Tag from "@/components/Tag/Tag";

// 3時間ごとにISR
export const revalidate = 60 * 60 * 3;

export default async function Home() {
  const fourPosts = await getPostsForTopPage(4);
  const allTags = await getAllTags();

  return (
    <div className="container w-full h-full mt-16 mx-auto">
      {/* TODO：共通のヘッダーリファクタ */}
      <h1 className="text-5xl font-medium text-center mb-16">{BLOG_TITLE}</h1>
      <div className="lg:grid lg:grid-cols-2 gap-4">
        {fourPosts.map((post) => (
          <div key={post.id} className="px-4">
            <SinglePost
              title={post.title}
              description={post.description}
              postedAt={post.postedAt}
              updatedAt={post.updatedAt}
              slug={post.slug}
              tags={post.tags}
              id={post.id}
              thumbnail={post.thumbnail}
              isPageNationPage={false}
            />
          </div>
        ))}
      </div>
      <Link href="/posts/page/1">
        <span className="mb-6 lg:w-1/2 mx-auto text-xl px-5 block text-right">
          ...もっとみる
        </span>
      </Link>
      <Tag tags={allTags} />
    </div>
  );
}
