import { Client } from "@notionhq/client";

//クライアント初期化 認証できているかをAuth
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

//DOCS:developers.notion.com/reference/post-database-query
export const getAllPosts = async () => {
  // DBのデータを取得
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    page_size: 100,
  });

  const allPosts = posts.results;

  return allPosts;
};
