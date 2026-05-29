/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumineer Teeth",
  description:
    "Lumineer Teeth is a dental clinic that provides dental services to patients.",
  keywords: "dental clinic, dental services, dental treatment, dental care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.includes("/admin");
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {!isAdminRoute && <GoogleTagManager gtmId="GTM-WLZZLKK8" />}
      <body className="min-h-full flex flex-col">
        {children}

        {/* Histats.com  START  (aync)*/}
        <Script id="histats-script" strategy="afterInteractive">
          {`
            var _Hasync= _Hasync|| [];
            _Hasync.push(['Histats.start', '1,4557418,4,0,0,0,00010000']);
            _Hasync.push(['Histats.fasi', '1']);
            _Hasync.push(['Histats.track_hits', '']);
            (function() {
            var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
            hs.src = ('//s10.histats.com/js15_as.js');
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
            })();
          `}
        </Script>
        <noscript>
          <a href="/" target="_blank">
            <img
              src="//sstatic1.histats.com/0.gif?4557418&101"
              alt=""
              style={{ border: 0 }}
            />
          </a>
        </noscript>
        {/* Histats.com  END  */}
      </body>
    </html>
  );
}
