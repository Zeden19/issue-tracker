import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/app/NavBar";
import { Theme } from "@radix-ui/themes";
import AuthProvider from "@/app/auth/Provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          <Theme appearance={"dark"} accentColor="violet">
            <NavBar />
            <main className={"p-5"}>{children}</main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
