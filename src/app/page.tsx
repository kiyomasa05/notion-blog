import Link from "next/link";
import { getAllTags, getPostsForTopPage } from "./lib/notionAPI";
import SinglePost from "@/components/Blog/SinglePost";
import Slider from "@/components/Splide/Splide";
import Tag from "@/components/Tag/AllTagList";
import Footer from "@/components/Navbar/Footer";

export default async function Home() {
  const sixPosts = await getPostsForTopPage(6);
  const allTags = await getAllTags();

  return (
    <div>
      <div className="mt-16 container w-full mx-auto lg:w-10/12">
        {/* TODO：共通のヘッダーリファクタ */}
        {/* TODO：imageの左右の余白検討 */}
        <Slider />
        <div className="container w-full h-full mx-auto">
          <div className="text-center mx-auto mb-6 text-xl font-medium lg:text-2xl">
            <h3 className="text-center font-medium border-none">New Posts</h3>
            <p className="font-extralight text-sm m-0">新着記事</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 container lg:w-11/12 mx-auto">
            {sixPosts.map((post) => (
              <div key={post.id} className="px-1">
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
            <span className="mb-6 w-40 lg:w-2/5 mx-auto text-lg px-5 py-1 lg:py-2 block text-center border-solid border-2 border-sky-600 text-sky-600 rounded-md font-medium hover:opacity-30  duration-300">
              MORE →
            </span>
          </Link>
          <Tag tags={allTags} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
