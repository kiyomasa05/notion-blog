import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { NUMBER_OF_POSTS_PER_PAGE } from "@/app/constants/constans";

//クライアント初期化 認証できているかをAuth
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// notion-to-mdのインスタンス化
// DOCS:https://www.npmjs.com/package/notion-to-md
const n2m = new NotionToMarkdown({ notionClient: notion });

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
  const getTags = (tags: []) => {
    const allTags = tags.map((tag: any) => {
      return tag.name;
    });
    return allTags;
  };
  const getDay = (date: string) => {
    const day = new Date(date);
    return day.toLocaleDateString();
  };
  return {
    id: post.id,
    title: post.properties.name.title[0].plain_text,
    description: post.properties.description.rich_text[0].plain_text,
    postedAt: getDay(post.properties.created_at.created_time),
    updatedAt: getDay(post.last_edited_time),
    slug: post.properties.slug.rich_text[0].plain_text,
    tags: getTags(post.properties.tags.multi_select),
  };
};

// 引数のslugが同じpostを取得する
export const getSinglePost = async (slug: string) => {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    // DBのslugフィールドから引数のslugを同じものを取得するquery
    filter: {
      property: "slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = res.results[0];
  const metadata = getPageMetaData(page);

  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    metadata,
    markdown: mdString,
  };
};

// Topページ用の記事の取得(4つ)
export const getPostsForTopPage = async (pageSize: number) => {
  const allPosts = await getAllPosts();
  const fourPosts = allPosts.slice(0, pageSize);
  return fourPosts;
};

// page番号に応じた記事を取得
export const getPostByPage = async (page: number) => {
  const allPosts = await getAllPosts();

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;
  return allPosts.slice(startIndex, endIndex);
};

// 全体のページ数を取得
export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts();
  return Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE) >
    0
    ? 1
    : 0;
};
