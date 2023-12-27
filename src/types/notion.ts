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
