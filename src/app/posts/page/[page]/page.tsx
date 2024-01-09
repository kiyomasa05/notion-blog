import {
  getAllTags,
  getNumberOfPages,
  getPostByPage,
} from "../../../lib/notionAPI";
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
    <div className="container w-full mt-24 mx-auto lg:w-10/12">
      <h1 className="font-medium text-center mb-4 border-none text-lg lg:text-2xl">
        記事一覧
      </h1>
      <p className="text-xl text-center">
        現在{" "}
        <span className="font-bold text-2xl text-red-600">{currentPage}</span>{" "}
        ページ目です
      </p>
      <section className="grid grid-cols-2 lg:grid-cols-3 container lg:w-11/12 mx-auto">
        {postByPage.map((post) => (
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
