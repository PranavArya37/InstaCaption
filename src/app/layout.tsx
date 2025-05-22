import type {Metadata} from 'next';
// import { GeistSans } from 'geist/font/sans'; // Removed to fix module not found error
// import { GeistMono } from 'geist/font/mono'; // Removed to fix module not found error
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// const geistSans = GeistSans; // Removed to fix module not found error
// const geistMono = GeistMono; // Removed to fix module not found error

export const metadata: Metadata = {
  title: 'InstaCaption',
  description: 'Generate AI-powered captions for your photos with InstaCaption.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"> {/* Removed geistSans.variable and geistMono.variable */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
