import {
  getAllTags,
  getNumberOfPages,
  getPostByPage,
} from "../../../../../lib/notionAPI";
import { BLOG_TITLE } from "@/app/constants/constans";
import SinglePost from "@/components/Blog/SinglePost";
import Pagenation from "@/components/Pagination/Pagenation";
import Tag from "@/components/Tag/Tag";

export const revalidate = 60 * 60 * 3;

const BlogPageList = async (context: any) => {
  const currentPage = context.params?.page;
  const postByPage = await getPostByPage(parseInt(currentPage));
  const numberOfPage = await getNumberOfPages();
  const allTags = await getAllTags();

  return (
    <div className="container w-full mt-24 mx-auto">
      <h1 className="text-5xl font-medium text-center mb-16 border-none">{BLOG_TITLE}</h1>
      <p className="text-xl text-center">
        現在{" "}
        <span className="font-bold text-2xl text-blue-600">{currentPage}</span>{" "}
        ページ目です
      </p>
      <section className="sm:grid grid-cols-2  gap-3 mx-2 lg:mx-auto">
        {postByPage.map((post) => (
          <div key={post.id}>
            <SinglePost
              title={post.title}
              description={post.description}
              postedAt={post.postedAt}
              updatedAt={post.updatedAt}
              slug={post.slug}
              tags={post.tags}
              id={post.id}
              thumbnail={post.thumbnail}
              isPageNationPage={true}
            />
          </div>
        ))}
      </section>
      <Pagenation numberOfPage={numberOfPage} tag={""} />
      <Tag tags={allTags} />
    </div>
  );
};

export default BlogPageList;
