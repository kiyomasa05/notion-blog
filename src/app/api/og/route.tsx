import { ImageResponse } from "next/og";
import { BLOG_TITLE } from "@/app/constants/constans";

export const runtime = "edge";
// useISR 1時間*3
export const revalidate = 60 * 60 * 3;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // title?以降の文字列を取得
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundImage:
              "linear-gradient(135deg, #f08080 10%, #8b0000 100%)",
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
