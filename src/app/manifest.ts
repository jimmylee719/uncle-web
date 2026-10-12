import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "古早味豬雜米粉湯",
    short_name: "古早味",
    description: "台北大安 古早味豬雜米粉湯｜豚之香",
    start_url: "/",
    display: "standalone",
    background_color: "#130f0d",
    theme_color: "#130f0d",
    lang: "zh-TW",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
