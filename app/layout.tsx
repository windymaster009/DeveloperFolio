import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kevin Nhim | Software Developer",
  description:
    "Developer portfolio for Kevin Nhim — backend, automation, bots, web applications, and systems projects.",
  metadataBase: new URL("https://github.com/windymaster009"),
  openGraph: {
    title: "Kevin Nhim | Software Developer",
    description:
      "Projects, technologies, and GitHub activity — automatically kept in sync with what I build.",
    type: "website",
  },
};

const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem("theme");
    var dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
  } catch (_) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
