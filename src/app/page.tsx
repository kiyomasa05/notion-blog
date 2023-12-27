import { getAllPosts } from "../../lib/notionAPI";
import SinglePost from "@/components/Blog/SinglePost";

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <div className="container w-full mt-16 ">
      <h1 className="text-5xl font-medium text-center mb-16">Notion Blog</h1>
      {allPosts.map((post, index) => (
        <div key={index} className="mx-4">
          <SinglePost
            title={post.title}
            description={post.description}
            date={post.date}
            slug={post.slug}
            tags={post.tags}
          />
          {/* <p>{post.id}</p>
          <p>{post.title}</p> */}
        </div>
      ))}
    </div>
  );
}
