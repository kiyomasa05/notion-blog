import { getPostByPage } from "../../../../../lib/notionAPI";
import SinglePost from "@/components/Blog/SinglePost";

const BlogPageList = async (context:any) => {
  const currentPage = context.params?.page;
  const postByPage = await getPostByPage(parseInt(currentPage));

  return (
    <div className="container w-full mt-16 mx-auto">
      <h1 className="text-5xl font-medium text-center mb-16">Notion Blog</h1>
      <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
        {postByPage.map((post, index) => (
          <div key={index}>
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
    </div>
  );
};

export default BlogPageList;
