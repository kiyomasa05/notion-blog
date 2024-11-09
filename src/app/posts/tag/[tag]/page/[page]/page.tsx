import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTagAndPage,
} from "../../../../../lib/notionAPI";
import SinglePost from "@/components/Blog/SinglePost";
import Pagenation from "@/components/Pagination/Pagenation";
import Tag from "@/components/Tag/Tag";

const BlogTagPageList = async (context: any) => {
  const currentPage: string = context.params?.page;
  const currentTag: string = context.params?.tag.toString();

  const posts = await getPostsByTagAndPage(
    currentTag,
    parseInt(currentPage, 10)
  );
  const numberOfPageByTag = await getNumberOfPagesByTag(currentTag);
  const allTags = await getAllTags();

  return (
    <div className="container w-full mt-24 mx-auto lg:w-10/12">
      <h1 className="font-medium text-center mb-16 border-none text-lg lg:text-2xl ">
        タグ検索：
        <span className="px-2 font-medium rounded-md bg-gray-400 inline-block">
          {currentTag}
        </span>
      </h1>
      <section className="grid grid-cols-2 lg:grid-cols-3 container lg:w-11/12 mx-auto">
        {posts.map((post) => (
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
      <Pagenation numberOfPage={numberOfPageByTag} tag={currentTag} />
      <Tag tags={allTags} />
    </div>
  );
};

export default BlogTagPageList;
