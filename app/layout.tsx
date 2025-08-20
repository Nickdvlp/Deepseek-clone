import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";

import AppSidebar from "@/components/AppSidebar";

export const metadata: Metadata = {
  title: "DeepSeek",
  description: "Smartest AI model on the earth.",
  icons: {
    icon: "/deepseek-img.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <html lang="en">
        <body>
          <AppSidebar />
          {children}
        </body>
      </html>
    </SidebarProvider>
  );
}
