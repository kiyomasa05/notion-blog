import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { NUMBER_OF_POSTS_PER_PAGE } from "@/app/constants/constans";
import { url } from "inspector";

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
    database_id: process.env.NOTION_DATABASE_ID || "",
    page_size: 100,
    filter: {
      property: "published",
      checkbox: { equals: true },
    },
    sorts: [
      {
        property: "created_at",
        direction: "descending",
      },
    ],
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
  const getThumbnail = (originThumbnail) => {
    const  thumbnail = (originThumbnail === null)
        ? "NoImage"
        : originThumbnail.external.url;
    return thumbnail
  };

  // console.log(post.cover.external.url);
  return {
    id: post.id,
    title: post.properties.name.title[0].plain_text,
    description: post.properties.description.rich_text[0].plain_text,
    postedAt: getDay(post.properties.created_at.created_time),
    updatedAt: getDay(post.last_edited_time),
    slug: post.properties.slug.rich_text[0].plain_text,
    tags: getTags(post.properties.tags.multi_select),
    thumbnail: getThumbnail(post.cover),
  };
};

// 引数のslugが同じpostを取得する
export const getSinglePost = async (slug: string) => {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
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
  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

//tagと一致するポストを返す
export const getPostsByTagAndPage = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;
  return posts.slice(startIndex, endIndex);
};

// tagと一致するポストのページ数を返す
export const getNumberOfPagesByTag = async (tagName: string) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );
  return (
    Math.floor(posts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (posts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

export const getAllTags = async () => {
  const allPosts = await getAllPosts();

  const allTagsDuplicationLists = allPosts.flatMap((post) => post.tags);
  const set = new Set(allTagsDuplicationLists);
  const allTagsList = Array.from(set);

  return allTagsList;
};
