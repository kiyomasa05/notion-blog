import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTagAndPage,
} from "../../../../../../../lib/notionAPI";
import SinglePost from "@/components/Blog/SinglePost";
import { BLOG_TITLE } from "@/app/constants/constans";
import Pagenation from "@/components/Pagination/Pagenation";

const BlogTagPageList = async (context: any) => {
  const currentPage: string = context.params?.page;
  const currentTag: string = context.params?.tag.toString();

  const posts = await getPostsByTagAndPage(
    currentTag,
    parseInt(currentPage, 10)
  );
  const numberOfPageByTag = await getNumberOfPagesByTag(currentTag);
  // const allTags = await getAllTags()

  return (
    <div className="container w-full mt-16 mx-auto">
      <h1 className="text-5xl font-medium text-center mb-16">{BLOG_TITLE}</h1>
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
              isPageNationPage={true}
            />
          </div>
        ))}
      </section>
      <Pagenation numberOfPage={numberOfPageByTag} tagOfPage={true} />
    </div>
  );
};

export default BlogTagPageList;
