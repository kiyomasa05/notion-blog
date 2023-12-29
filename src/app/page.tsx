import { getPostsForTopPage } from "../../lib/notionAPI";
import SinglePost from "@/components/Blog/SinglePost";
import Link from "next/link";
import { BLOG_TITLE } from "./constants/constans";

export default async function Home() {
  const fourPosts = await getPostsForTopPage(4);

  return (
    <div className="container w-full h-full mt-16 mx-auto">
      {/* TODO：共通のヘッダーリファクタ */}
      <h1 className="text-5xl font-medium text-center mb-16">{BLOG_TITLE}</h1>
      {fourPosts.map((post) => (
        <div key={post.id}>
          <SinglePost
            title={post.title}
            description={post.description}
            postedAt={post.postedAt}
            updatedAt={post.updatedAt}
            slug={post.slug}
            tags={post.tags}
            id={post.id}
            isPageNationPage={false}
          />
        </div>
      ))}
      <Link href="/posts/page/1">
        <span className="mb-6 lg:w-1/2 mx-auto text-xl px-5 block text-right">
          ...もっとみる
        </span>
      </Link>
    </div>
  );
}
