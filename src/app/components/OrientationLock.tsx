'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Extend the ScreenOrientation interface to include the lock method
interface ScreenOrientationWithLock extends ScreenOrientation {
  lock?: (orientation: string) => Promise<void>;
}

export default function OrientationLock() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    // Function to check orientation using multiple methods
    const checkOrientation = () => {
      // Method 1: Screen orientation API
      let orientationFromAPI = false;
      if (screen.orientation) {
        const angle = screen.orientation.angle;
        orientationFromAPI = angle === 90 || angle === -90;
      }

      // Method 2: Window orientation (legacy)
      let orientationFromWindow = false;
      if (typeof window.orientation !== 'undefined') {
        orientationFromWindow = window.orientation === 90 || window.orientation === -90;
      }

      // Method 3: Viewport dimensions
      let orientationFromDimensions = false;
      const { innerWidth, innerHeight } = window;
      orientationFromDimensions = innerWidth > innerHeight;

      // Method 4: Media query check
      let orientationFromMediaQuery = false;
      if (window.matchMedia) {
        orientationFromMediaQuery = window.matchMedia('(orientation: landscape)').matches;
      }

      // Use the most reliable method available
      const detectedLandscape = orientationFromAPI || orientationFromWindow || orientationFromDimensions || orientationFromMediaQuery;

      console.log('Orientation Detection:', {
        api: orientationFromAPI,
        window: orientationFromWindow,
        dimensions: orientationFromDimensions,
        mediaQuery: orientationFromMediaQuery,
        final: detectedLandscape,
        screenAngle: screen.orientation?.angle,
        windowOrientation: window.orientation,
        dimensions: `${innerWidth}x${innerHeight}`
      });

      setIsLandscape(detectedLandscape);
      return detectedLandscape;
    };

    // Lock orientation using Screen Orientation API
    const lockOrientation = async () => {
      try {
        // Check if screen orientation API is available
        if (screen.orientation && 'lock' in screen.orientation) {
          await (screen.orientation as ScreenOrientationWithLock).lock?.('portrait-primary');
        }
      } catch (error) {
        console.log('Screen orientation lock not supported or failed:', error);
      }
    };

    // Initial check
    checkOrientation();

    // Lock orientation on component mount
    lockOrientation();

    // Handle orientation change events
    const handleOrientationChange = () => {
      // Use setTimeout to ensure the orientation change is complete
      setTimeout(() => {
        checkOrientation();
        // Attempt to lock orientation again if it changes
        lockOrientation();
      }, 100);
    };

    // Handle window resize (fallback for orientation detection)
    const handleResize = () => {
      setTimeout(() => {
        checkOrientation();
      }, 100);
    };

    // Media query listener for landscape detection
    const landscapeMediaQuery = window.matchMedia('(orientation: landscape)');
    const handleMediaQueryChange = () => {
      setTimeout(() => {
        checkOrientation();
      }, 100);
    };

    // Listen for orientation changes
    if (screen.orientation) {
      screen.orientation.addEventListener('change', handleOrientationChange);
    }

    // Fallback listeners for better compatibility
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleResize);

    // Media query listener
    if (landscapeMediaQuery.addEventListener) {
      landscapeMediaQuery.addEventListener('change', handleMediaQueryChange);
    } else {
      // Fallback for older browsers
      landscapeMediaQuery.addListener(handleMediaQueryChange);
    }

    // Cleanup event listeners
    return () => {
      if (screen.orientation) {
        screen.orientation.removeEventListener('change', handleOrientationChange);
      }
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleResize);

      if (landscapeMediaQuery.removeEventListener) {
        landscapeMediaQuery.removeEventListener('change', handleMediaQueryChange);
      } else {
        // Fallback for older browsers
        landscapeMediaQuery.removeListener(handleMediaQueryChange);
      }
    };
  }, []);

  // Don't render anything if in portrait mode
  if (!isLandscape) return null;

  return (
    <div className="fixed inset-0 bg-black text-white z-[9999] flex flex-col items-center justify-center text-center p-8">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Rotate Phone Icon */}
        <div className="relative">
          <div className="w-24 h-24 border-4 border-white rounded-2xl flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          {/* Rotation Arrow */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <path d="M21 2v6h-6" />
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
            </svg>
          </div>
        </div>

        {/* Warning Message */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white font-euclid-semibold">
            Rotește dispozitivul
          </h2>
          <p className="text-lg text-gray-300 max-w-sm font-euclid-regular">
            Această aplicație funcționează doar în modul portret.
            Te rugăm să rotești dispozitivul pentru a continua.
          </p>
        </div>

        {/* App Logo */}
        <div className="mt-8">
          <Image
            src="/returo_logo.png"
            alt="RetuRO Logo"
            width={120}
            height={40}
            className="opacity-70"
          />
        </div>
      </div>
    </div>
  );
} 