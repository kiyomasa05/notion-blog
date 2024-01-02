import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTagAndPage,
} from "../../../../../../../lib/notionAPI";
import { BLOG_TITLE } from "@/app/constants/constans";
import SinglePost from "@/components/Blog/SinglePost";
import Pagenation from "@/components/Pagination/Pagenation";
import Tag from "@/components/Tag/Tag";

export const revalidate = 60 * 60 * 3;

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
    <div className="container w-full mt-24 mx-auto">
      <h1 className="text-5xl font-medium text-center mb-16 border-none">{BLOG_TITLE}</h1>
      <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
        {posts.map((post) => (
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
      <Pagenation numberOfPage={numberOfPageByTag} tag={currentTag} />
      <Tag tags={allTags} />
    </div>
  );
};

export default BlogTagPageList;
