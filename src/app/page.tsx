import Image from "next/image";
import Link from "next/link";
import { getAllTags, getPostsForTopPage } from "../../lib/notionAPI";
import SinglePost from "@/components/Blog/SinglePost";
import Tag from "@/components/Tag/Tag";

// 3時間ごとにISR
export const revalidate = 60 * 60 * 3;

export default async function Home() {
  const fourPosts = await getPostsForTopPage(4);
  const allTags = await getAllTags();

  return (
    <div className=" mt-16 ">
      {/* TODO：共通のヘッダーリファクタ */}
      <Image
        src="/youkoso.gif"
        height={410}
        width={850}
        alt="topimage"
        className="h-full"
      />
      {/* <h1 className="text-5xl font-medium text-center mb-10 border-none">{BLOG_TITLE}</h1> */}
      <div className="container w-full h-full mx-auto">
        <div className="text-center mx-auto mb-6 text-xl font-medium lg:text-2xl">
          <h3 className="text-center font-medium border-none">New Posts</h3>
          <p className="font-extralight text-sm m-0">新着記事</p>
        </div>

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
        <Link href="/posts/page/2">
          <span className="mb-6 w-48 lg:w-1/2 mx-auto text-xl px-5 py-2 block text-center border-solid border-2 border-blue-200 text-blue-400 rounded-md">
            MORE →
          </span>
        </Link>
        <Tag tags={allTags} />
      </div>
    </div>
  );
}
