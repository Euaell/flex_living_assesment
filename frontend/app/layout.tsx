import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Flex Living Assessment",
  description: "A web application for Flex Living property assessments.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
