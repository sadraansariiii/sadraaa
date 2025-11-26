import NextTopLoader from "nextjs-toploader";
import "./globals.css";
  import AppId from "../components/AppId";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="w-screen min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
         <NextTopLoader
          color="var(--orgin-color)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={500}
          shadow="0 0 10px #2d3446, 0 0 5px #2d3446"
          zIndex={1600}
          showAtBottom={false}
        />

        <AppId />
        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
