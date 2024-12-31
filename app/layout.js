import { Geist, Geist_Mono, Kanit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kanitfnt = Kanit({
  variable: "--font-Kanit-sans",
  subsets: ["latin"],
  weight: "400",
});
export const metadata = {
  title: "Winway: Spoof Casino Game",
  description: "Play spoof casino game for fun, developed by abhay patel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kanitfnt} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
