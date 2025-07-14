'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function OrientationLock() {
  useEffect(() => {
    // Function to check orientation (for potential future use)
    const checkOrientation = () => {
      const orientation = window.orientation;
      const isCurrentlyLandscape =
        orientation === 90 ||
        orientation === -90 ||
        window.innerWidth > window.innerHeight;
      // CSS media queries handle the display logic
      console.log('Orientation changed:', isCurrentlyLandscape ? 'landscape' : 'portrait');
    };

    // Lock orientation using Screen Orientation API
    const lockOrientation = async () => {
      try {
        // Check if screen orientation API is available
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('portrait-primary');
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
      checkOrientation();
      // Attempt to lock orientation again if it changes
      setTimeout(() => {
        lockOrientation();
      }, 500);
    };

    // Handle window resize (fallback for orientation detection)
    const handleResize = () => {
      checkOrientation();
    };

    // Listen for orientation changes
    if (screen.orientation) {
      screen.orientation.addEventListener('change', handleOrientationChange);
    }

    // Fallback listeners for better compatibility
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleResize);

    // Cleanup event listeners
    return () => {
      if (screen.orientation) {
        screen.orientation.removeEventListener('change', handleOrientationChange);
      }
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Landscape Warning Overlay */}
      <div className="landscape-warning">
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
    </>
  );
} 