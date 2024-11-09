import { ImageResponse } from "next/og";
import { BLOG_TITLE } from "@/app/constants/constans";
import { getSinglePost } from "@/app/lib/notionAPI";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Params = {
  params: { slug: string };
};

// DOCS:https://qiita.com/akt_10/items/1d9127ba0e3f4d3b1baa
// DOCS:https://vercel.com/docs/functions/edge-functions/og-image-generation
export default async function Image({ params: { slug } }: Params) {
  const post = await getSinglePost(slug);
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundImage: "linear-gradient(135deg, #f08080 10%, #8b0000 100%)",
          color: "#1f1f1f",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 2rem",
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
          <p style={{ fontSize: 60, fontWeight: 700 }}>
            {post?.metadata.title}
          </p>
          <p style={{ fontSize: 40, fontWeight: 500 }}>{BLOG_TITLE}</p>
        </div>
      </div>
    ),
    { ...size }
  );
}
