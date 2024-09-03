import { Inter } from "next/font/google";
import "./globals.css";
import '../node_modules/uswds/dist/css/uswds.min.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AIDAN-SK",
  description: "AIDAN-SK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
