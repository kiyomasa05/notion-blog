import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { cache } from "react";
import { NUMBER_OF_POSTS_PER_PAGE } from "@/app/constants/constans";
import CreateThumbnail from "@/components/CreateThumbnail/CreateThumbnail";


//クライアント初期化 認証できているかをAuth
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// notion-to-mdのインスタンス化
// DOCS:https://www.npmjs.com/package/notion-to-md
const n2m = new NotionToMarkdown({ notionClient: notion });

//DOCS:developers.notion.com/reference/post-database-query
export const getAllPosts = cache(async () => {
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
});

//TODO post型定義  like機能つけた後

type PostMetaData = {
  id: string;
  title: string;
  description?: string;
  postedAt: string;
  updatedAt: string;
  slug: string;
  tags: string[];
  thumbnail: string;
};

/**
 * 各notionブログのフィールドを変更し返す
 * @param post
 * @returns PostMetaData
 */
const getPageMetaData = (post: any): PostMetaData => {
  const getTags = (tags: []) => {
    const allTags = tags.map((tag: any) => {
      return tag.name;
    });
    return allTags;
  };
  const getDay = (stringDate: string) => {
    const date = new Date(stringDate);
    const [month, day, year] = [
      date.getMonth() + 1,
      date.getDate(),
      date.getFullYear(),
    ];
    // 二桁にフォーマット
    const formatMonth = month < 10 ? "0" + month : month;
    const formatDay = day < 10 ? "0" + day : day;
    const formatDate = `${year}年 ${formatMonth}月 ${formatDay}日`;
    return formatDate;
  };
  const getThumbnail = (originThumbnail: any) => {
    const placeholderURL =
      "https://placehold.jp/a8a8b3/ffffff/320x240.png?text=NO-IMAGE";

    if (originThumbnail === null || !originThumbnail.type) {
      return placeholderURL;
    }

    switch (originThumbnail.type) {
      case "file":
        return originThumbnail.file?.url || placeholderURL;
      case "external":
        return originThumbnail.external?.url || placeholderURL;
      default:
        return placeholderURL;
    }
  };

  return {
    id: post.id,
    title: post.properties.name.title[0].plain_text,
    description: post.properties.description.rich_text[0]?.plain_text, // discriptionがない場合もある
    postedAt: getDay(post.properties.created_at.date.start),
    updatedAt: getDay(post.last_edited_time),
    slug: post.properties.slug.rich_text[0].plain_text,
    tags: getTags(post.properties.tags.multi_select),
    thumbnail: getThumbnail(post.cover),
  };
};

// 引数のslugが同じpostを取得する
export const getSinglePost = async (slug: string) => {
  try {
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
    if (res.results.length === 0) {
      // 与えられたslugに対する結果が見つからない場合の処理
      console.error(`slug: ${slug} に対する結果が見つかりませんでした`);
      return null;
    }
    const page = res.results[0];
    const metadata = getPageMetaData(page);

    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
      metadata,
      markdown: mdString,
    };
  } catch (e) {
    console.error(e);
  }
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
