import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../store/ReduxProvider";
import AuthStatus from "./components/AuthStatus";
import OrientationLock from "./components/OrientationLock";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RetuRO Romania - Return & Recycle",
  description: "RetuRO Romania - Return, Recycle, and get Rewarded for a sustainable future",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RetuRO",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "RetuRO Romania",
    title: "RetuRO Romania - Return & Recycle",
    description: "Return, Recycle, and get Rewarded for a sustainable future",
  },
  twitter: {
    card: "summary",
    title: "RetuRO Romania - Return & Recycle",
    description: "Return, Recycle, and get Rewarded for a sustainable future",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Viewport - Enhanced for iOS PWA */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content" />

        {/* Orientation Lock */}
        <meta name="screen-orientation" content="portrait" />
        <meta name="x5-orientation" content="portrait" />
        <meta name="x5-fullscreen" content="true" />
        <meta name="full-screen" content="yes" />
        <meta name="browsermode" content="application" />

        {/* Theme Color */}
        <meta name="theme-color" content="#39AE70" />

        {/* PWA Meta Tags */}
        <meta name="application-name" content="RetuRO Romania" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="RetuRO" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#39AE70" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* iOS Camera Permissions */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />

        {/* Apple Touch Icons - Critical for iOS PWA */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png?v=2" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png?v=2" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png?v=2" />

        {/* Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-48x48.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-48x48.png?v=2" />
        <link rel="shortcut icon" href="/icons/icon-192x192.png?v=2" />

        {/* Apple Splash Screens */}
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png?v=2" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json?v=2" />
      </head>
      <body className={`${inter.className} bg-gray-50`} style={{ height: '100dvh', overflow: 'hidden', overscrollBehavior: 'none' }}>
        <ReduxProvider>
          <AuthStatus />
          <OrientationLock />
          <div className="max-w-md mx-auto bg-white pwa-container portrait-only">
            {children}
          </div>
          <Analytics />
        </ReduxProvider>
      </body>
    </html>
  );
}
