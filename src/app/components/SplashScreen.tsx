'use client';

import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(onComplete, 500); // Extra delay for smooth transition
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 flex flex-col items-center justify-center z-50">
      {/* Logo/Icon */}
      <div className="mb-8 animate-pulse">
        <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
          <svg
            width="80"
            height="80"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-emerald-500"
          >
            <circle cx="256" cy="200" r="80" stroke="currentColor" strokeWidth="12" fill="none" />
            <path d="M196 240 L316 240 M256 180 L256 320" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
            <path d="M196 280 Q256 320 316 280" stroke="currentColor" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M180 150 Q200 130 220 150 Q230 160 220 170 Q200 180 180 170 Q170 160 180 150 Z" fill="currentColor" />
            <path d="M292 150 Q312 130 332 150 Q342 160 332 170 Q312 180 292 170 Q282 160 292 150 Z" fill="currentColor" />
            <path d="M236 120 Q256 100 276 120 Q286 130 276 140 Q256 150 236 140 Q226 130 236 120 Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
        RetuRO
      </h1>

      {/* Tagline */}
      <p className="text-xl text-emerald-100 mb-12 text-center px-8">
        Return • Recycle • Reward
      </p>

      {/* Loading Animation */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className={`h-full bg-white rounded-full transition-all duration-2000 ease-in-out ${loading ? 'w-0' : 'w-full'
              }`}
          />
        </div>
        <p className="text-emerald-100 mt-4 text-sm">
          Preparing your eco-friendly experience...
        </p>
      </div>

      {/* Romania Flag Colors Accent */}
      <div className="absolute bottom-8 flex space-x-2">
        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
        <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
} 