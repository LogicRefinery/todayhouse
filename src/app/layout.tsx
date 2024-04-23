import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

import "./_styles/reset.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "./(todayhouse)/_components/Header";

import CombineProviders from "@/providers/CombineProviders";

export const metadata: Metadata = {
  title: "THMall",
  description: "세상에서 가장 저렴한 상점",
  category: "온라인 마켓",
  keywords: ["옷", "의류", "패션"],
  openGraph: {
    title: "THMall",
    description: "세상에서 가장 저렴한 온라인 마켓",
    images: ["/productMain.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={roboto.className}>
      <body>
        <Header />
        <CombineProviders>{children}</CombineProviders>
      </body>
    </html>
  );
}
