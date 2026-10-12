import Link from "next/link";
import "./globals.css";

export const metadata = { title: "404 | 古早味豬雜米粉湯" };

export default function GlobalNotFound() {
  return (
    <html lang="zh-TW">
      <body className="grid min-h-screen place-items-center bg-[#130f0d] px-6 text-center text-[#f3ead7]">
        <div>
          <p className="numeral text-[clamp(6rem,22vw,14rem)] font-black leading-none text-[#c4352a]">404</p>
          <p className="mt-4 font-serif text-2xl font-black">這一碗，被喝光了。</p>
          <p className="mt-2 text-sm opacity-70">This bowl is all gone — the page you’re after doesn’t exist.</p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-[#a5231c] px-8 py-3 text-sm font-bold tracking-widest text-[#fbf6ea]"
          >
            回首頁 · Home
          </Link>
        </div>
      </body>
    </html>
  );
}
