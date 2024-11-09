import { ImageResponse } from "next/og";
import { BLOG_TITLE } from "@/app/constants/constans";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function CreateThumbnail(title: string) {
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
            padding: "3rem 4rem 2.5rem",
            backgroundColor: "#fdfdfd",
            justifyContent: "space-between",
            borderRadius: "10px",
            width: "100%",
            height: "90%",
          }}
        >
          <p style={{ fontSize: 60, fontWeight: 700 }}>{title}</p>
          <p style={{ fontSize: 40, fontWeight: 500 }}>{BLOG_TITLE}</p>
        </div>
      </div>
    ),
    { ...size }
  );
}
