import {
  getAllTags,
  getNumberOfPages,
  getPostByPage,
} from "../../../lib/notionAPI";
import SinglePost from "@/components/Blog/SinglePost";
import Pagenation from "@/components/Pagination/Pagenation";
import Tag from "@/components/Tag/Tag";

export const revalidate = 604800; // 1週間ごと

/**
 * ビルド時にPostの数分、pageを作っておく
 * nextjs.org/docs/app/api-reference/functions/generate-static-params
 * @returns [{ page: "1" }, { page: "2" }, { page: "3" }];
 */
export async function generateStaticParams() {
  // page数を取得
  const numberOfPage = await getNumberOfPages();

  if (numberOfPage <= 0) {
    return []; // ページ数が1ページ以下の場合はパスを生成しない
  }
  const pages: { page: string }[] = Array.from(
    { length: numberOfPage },
    (_, i) => ({
      page: (i + 1).toString(),
    })
  );

  return [...pages];
}

// NEXT15でのparamsの指定の仕方注意 ParamsをPromise型にしないとbuild時に型エラーになる
//  https://nextjs.org/docs/app/building-your-application/upgrading/version-15#async-request-apis-breaking-change
export default async function BlogPageListPost({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;

  const postByPage = await getPostByPage(parseInt(page));
  const numberOfPage = await getNumberOfPages();
  const allTags = await getAllTags();

  return (
    <div className="container w-full mt-24 mx-auto lg:w-10/12">
      <h1 className="font-medium text-center mb-4 border-none text-lg lg:text-2xl">
        記事一覧
      </h1>
      <p className="text-xl text-center">
        現在 <span className="font-bold text-2xl text-red-600">{page}</span>{" "}
        ページ目です
      </p>
      <section className="grid grid-cols-2 lg:grid-cols-3 container lg:w-11/12 mx-auto">
        {postByPage.map((post) => (
          <div key={post.id} className="px-1">
            <SinglePost
              title={post.title}
              description={post.description}
              postedAt={post.postedAt}
              updatedAt={post.updatedAt}
              slug={post.slug}
              tags={post.tags}
              id={post.id}
              thumbnail={post.thumbnail}
              isPageNationPage={true}
            />
          </div>
        ))}
      </section>
      <Pagenation numberOfPage={numberOfPage} tag={""} />
      <Tag tags={allTags} />
    </div>
  );
}
