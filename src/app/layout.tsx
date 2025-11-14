import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { OpsBotProvider } from "@/context/json-context";
import { Toaster } from "sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/client/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Chat Bot",
  description: "Developed by Hari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Toaster richColors position="top-right" />
          <SidebarProvider defaultOpen={false} >
            <OpsBotProvider>{children}</OpsBotProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
