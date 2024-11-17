import { ImageResponse } from "next/og";
import { BLOG_TITLE } from "@/app/constants/constans";

export const runtime = "edge";

export const revalidate = 86400;

type Params = {
  title: string;
};
//localhost:3000/api/og?title="title"
// リクエストを受ける形でOGのimageを返す

// 現状定義したが使えてない
// export async function generateStaticParams() {
//   const posts: PostMetaData[] = await getAllPosts();

//   return posts.map((post) => ({
//     title: post.title,
//   }));
// }

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // title?以降の文字列を取得
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : BLOG_TITLE;
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundImage:
              "linear-gradient(135deg, #0285c7 10%,  #075985 100%)",
            color: "#1f1f1f",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem 2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2rem 10rem 2.5rem",
              backgroundColor: "#fdfdfd",
              justifyContent: "space-between",
              borderRadius: "10px",
              width: "100%",
              height: "90%",
            }}
          >
            <h2 style={{ fontSize: 70, fontWeight: "bold" }}>{title}</h2>
            <p style={{ fontSize: 40, fontWeight: 900 }}>{BLOG_TITLE}</p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
