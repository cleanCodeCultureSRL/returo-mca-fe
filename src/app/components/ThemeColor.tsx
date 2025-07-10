'use client';

import { useEffect } from 'react';

interface ThemeColorProps {
  color: string;
}

export default function ThemeColor({ color }: ThemeColorProps) {
  useEffect(() => {
    // Update the theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    }

    // Update the apple-mobile-web-app-status-bar-style if needed
    const metaStatusBarStyle = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (metaStatusBarStyle) {
      // Use black-translucent for colored backgrounds, default for white
      const statusBarStyle = color === '#ffffff' ? 'default' : 'black-translucent';
      metaStatusBarStyle.setAttribute('content', statusBarStyle);
    }
  }, [color]);

  return null; // This component doesn't render anything
} 