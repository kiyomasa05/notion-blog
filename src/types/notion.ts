import type {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  ToDoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  tag: string;
};

// 最終的に表示するPostデータ
export type PostMetaData = {
  id: string;
  title: string;
  description?: string;
  postedAt: string;
  updatedAt: string;
  slug: string;
  tags: string[];
  thumbnail: string;
};
