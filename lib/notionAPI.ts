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

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};
const getPageMetaData = (post: any) => {
  const getTags = (tags: any) => {
    const allTags = tags.map((tag: any) => {
      return tag.name;
    });
    return allTags;
  };
  return {
    id: post.id,
    title: post.properties.name.title[0].plain_text,
    description: post.properties.description.rich_text[0].plain_text,
    date: post.properties.created_at.created_time,
    slag: post.properties.slag.rich_text[0].plain_text,
    tags: getTags(post.properties.tags.multi_select),
  };
};
