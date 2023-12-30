import {
  getAllTags,
  getNumberOfPages,
  getPostByPage,
} from "../../../../../lib/notionAPI";
import SinglePost from "@/components/Blog/SinglePost";
import { BLOG_TITLE } from "@/app/constants/constans";
import Pagenation from "@/components/Pagination/Pagenation";
import Tag from "@/components/Tag/Tag";

const BlogPageList = async (context: any) => {
  const currentPage = context.params?.page;
  const postByPage = await getPostByPage(parseInt(currentPage));
  const numberOfPage = await getNumberOfPages();
  const allTags = await getAllTags();

  return (
    <div className="container w-full mt-16 mx-auto">
      <h1 className="text-5xl font-medium text-center mb-16">{BLOG_TITLE}</h1>
      <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
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
