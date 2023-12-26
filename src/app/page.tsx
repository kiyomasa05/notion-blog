import { getAllPosts } from "../../lib/notionAPI";

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <div>
      <h1 className="text-red-500 bg-red-100">遊ぶ</h1>
      {allPosts.map((post, index) => (
        <div key={index}>
          <p>{post.id}</p>;
          <p>{post.title}</p>;
        </div>
      ))}
      <p>head</p>
    </div>
  );
}
