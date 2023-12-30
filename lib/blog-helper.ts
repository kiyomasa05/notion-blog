export const getPageLink = (tag: string, page: number) => {
  // tagがあるときとない時でページネーションリンク変更
  return tag  ? `/posts/tag/${tag}/page/${page}` : `/posts/page/${page}`;
};
