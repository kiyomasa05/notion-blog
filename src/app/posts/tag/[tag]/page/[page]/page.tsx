import { Metadata, ResolvingMetadata } from "next";
import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTagAndPage,
} from "../../../../../lib/notionAPI";
import { BLOG_TITLE } from "@/app/constants/constans";
import SinglePost from "@/components/Blog/SinglePost";
import Pagenation from "@/components/Pagination/Pagenation";
import AllTagList from "@/components/Tag/AllTagList";

export const revalidate = 604800; // 1週間ごと

// ISR用のParams情報
type Params = {
  tag: string;
  page: string;
};

// metadata用のProps情報
type Props = {
  params: Promise<{ tag: string; page: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * ビルド時にタグごとのpageを作成しておく（複数の動的param）
 * https://nextjs.org/docs/app/api-reference/functions/generate-static-params#multiple-dynamic-segments-in-a-route
 * @returns Params[] [{tag:"string",page:"1"},{tag:"string",page:"2"},{tag:"bbb",page:"1"}]
 */
export async function generateStaticParams() {
  const allTags: string[] = await getAllTags();
  const results = [];

  for (const tag of allTags) {
    // tagごとのpage数を取得
    const numOfPostsByTag = await getNumberOfPagesByTag(tag);

    // ページ数分ループしてパラメータを生成
    for (let page = 1; page <= numOfPostsByTag; page++) {
      results.push({ tag, page: page.toString() });
    }
  }
  return results;
}

// doc:https://nextjs.org/docs/app/api-reference/functions/generate-metadata#the-metadata-object
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const tag = (await params).tag;
  const page = (await params).page;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const mataDescription = `${tag}の投稿一覧:${page}ページ | ${BLOG_TITLE}`;
  return {
    title: mataDescription,
    keywords: [tag],
    openGraph: {
      title: mataDescription,
      description: mataDescription,
      images: [...previousImages],
    },
  };
}

export default async function BlogTagPageList({
  params,
}: {
  params: Promise<Params>;
}) {
  const currentPage: string = (await params).page;
  const currentTag: string = (await params).tag;

  const posts = await getPostsByTagAndPage(
    currentTag,
    parseInt(currentPage, 10)
  );
  const numberOfPageByTag = await getNumberOfPagesByTag(currentTag);
  // TODO allTagはTagコンポーネントでやればいい、出力してるだけなんだから
  const allTags = await getAllTags();

  return (
    <div className="container w-full mt-24 mx-auto lg:w-10/12">
      <h1 className="font-medium text-center mb-16 border-none text-lg lg:text-2xl ">
        タグ検索：
        <span className="px-2 font-medium rounded-md bg-gray-400 inline-block">
          {currentTag}
        </span>
      </h1>
      <section className="grid grid-cols-2 lg:grid-cols-3 container lg:w-11/12 mx-auto">
        {posts.map((post) => (
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
      <Pagenation numberOfPage={numberOfPageByTag} tag={currentTag} />
      <AllTagList tags={allTags} />
    </div>
  );
}
