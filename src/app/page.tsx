import { getPostsForTopPage } from "../../lib/notionAPI";
import SinglePost from "@/components/Blog/SinglePost";
import Link from "next/link";

export default async function Home() {
  const fourPosts = await getPostsForTopPage(4);

  return (
    <div className="container w-full h-full mt-16 mx-auto">
      <h1 className="text-5xl font-medium text-center mb-16">Notion Blog</h1>
      {fourPosts.map((post, index) => (
        <div key={index}>
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
