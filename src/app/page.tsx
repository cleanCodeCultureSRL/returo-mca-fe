'use client';

import { useState } from 'react';
import SplashScreen from './components/SplashScreen';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="bg-emerald-500 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-emerald-100">Ready to make a difference?</p>
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-emerald-500"
            >
              <circle cx="256" cy="200" r="80" stroke="currentColor" strokeWidth="12" fill="none" />
              <path d="M196 240 L316 240 M256 180 L256 320" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              <path d="M196 280 Q256 320 316 280" stroke="currentColor" strokeWidth="12" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
            <div className="text-2xl font-bold text-emerald-600">0</div>
            <div className="text-sm text-gray-600">Items Returned</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
            <div className="text-2xl font-bold text-emerald-600">0 RON</div>
            <div className="text-sm text-gray-600">Rewards Earned</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-emerald-500 text-white p-4 rounded-2xl font-semibold text-lg shadow-lg active:scale-95 transition-transform">
            🔄 Return Items
          </button>

          <button className="w-full bg-white border-2 border-emerald-500 text-emerald-600 p-4 rounded-2xl font-semibold text-lg active:scale-95 transition-transform">
            📍 Find Collection Points
          </button>

          <button className="w-full bg-white border-2 border-emerald-500 text-emerald-600 p-4 rounded-2xl font-semibold text-lg active:scale-95 transition-transform">
            🎁 View Rewards
          </button>
        </div>

        {/* Environmental Impact */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-6 rounded-2xl text-white">
          <h3 className="text-lg font-bold mb-2">🌱 Your Impact</h3>
          <p className="text-green-100 text-sm">
            Every item you return helps create a cleaner Romania. Join thousands making a difference!
          </p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🌟</div>
            <p>Start returning items to see your activity here!</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Placeholder */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 p-4">
        <div className="flex justify-around">
          <button className="flex flex-col items-center text-emerald-500">
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <div className="w-6 h-6 mb-1">🔄</div>
            <span className="text-xs">Return</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <div className="w-6 h-6 mb-1">📍</div>
            <span className="text-xs">Locations</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <div className="w-6 h-6 mb-1">👤</div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </main>
  );
}
