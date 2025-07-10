'use client';

import { useState } from 'react';
import Image from 'next/image';
import { primary, yellow, text } from '../styles/colors';
import ReceiptCard from '../components/ReceiptCard';
import MapboxMap from '../components/MapboxMap';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: primary.lightGreen }}>
      {/* Header */}
      <div className="p-4 pt-6">
        <div className="flex items-center justify-between">
          {/* Profile Section - Floating Pill */}
          <div className="flex items-center bg-black rounded-4xl h-[62px] flex-1  max-w-md mr-12">
            <div className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center border-2 border-black">
              <Image
                src="/icons/barcode_scanner_icon.png"
                alt="Barcode Scanner"
                width={40}
                height={40}
              />
            </div>
            <div className="flex-1 px-4 py-3">
              <p className="text-white text-sm font-euclid-regular">Soldul tău, <span className="font-euclid-bold">Andrei</span></p>
              <div className="flex items-center">
                <Image
                  src="/icons/wallet_icon.png"
                  alt="Wallet"
                  width={18}
                  height={18}
                  className="w-[18px] h-[14px] mr-1"
                />
                <span className="text-white text-lg font-euclid-bold">1.832,05</span>
                <span className="text-white text-sm ml-1 font-euclid-regular">Ron</span>
              </div>
            </div>
          </div>

          {/* Menu Button - Floating */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-[62px]  h-[62px] rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: yellow }}
          >
            <Image
              src="/icons/hamburger_menu_icon.png"
              alt="Menu"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-4 space-y-6">
        {/* Environmental Impact Card */}
        <div className="bg-black rounded-3xl relative overflow-hidden">
          {/* Green Card - Top Section */}
          <div className="bg-primary-green rounded-3xl p-4 relative overflow-hidden mb-2 border-3 border-black">
            {/* Homepage Illustration */}
            <div className="absolute -top-0 -right-1 w-20 h-24 z-20">
              <Image
                src="/illustrations/homepage_illustration.png"
                alt="Homepage illustration"
                width={80}
                height={96}
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className="text-white text-2xl font-euclid-bold mb-6">Ai salvat planeta:</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-black text-5xl font-azo-bold">600<span className="text-2xl font-azo-regular">g</span></div>
                <p className="text-black text-sm font-euclid-bold">Mai puțin CO₂</p>
              </div>
              <div className="border-l-2 border-black pl-4">
                <div className="text-black text-5xl font-azo-bold">36<span className="text-2xl font-azo-regular">k</span></div>
                <p className="text-black text-sm font-euclid-bold">Peturi reciclate</p>
              </div>
            </div>
          </div>

          {/* Progress Bar - Bottom Section */}
          <div className="px-4 pb-2">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-euclid-regular" style={{ color: text.subtitle }}>Provocarea lunara</span>
              <span className="text-sm font-euclid-semibold" style={{ color: yellow }}>100</span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div className="h-3 rounded-full" style={{ backgroundColor: yellow, width: '80.6%' }}></div>
              </div>
              <div className="absolute -top-8 left-[80.6%] transform -translate-x-1/2">
                <div>
                  <span className="text-white text-sm font-azo-bold">80</span>
                  <Image
                    src="/icons/progress_bar_icon.png"
                    alt="Progress"
                    width={14}
                    height={14}
                    className="ml-1 mb-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Recycling */}
        <div>
          <h3 className="text-black text-xl font-euclid-bold mb-4">Ultimele reciclări</h3>

          <div className="flex space-x-4 overflow-x-auto pb-4">
            {/* Receipt 1 */}
            <ReceiptCard
              receiptNumber="00044728"
              date="17/06/2025 13:47"
              amount="9 RON"
              retailer="Kaufland"
            />
            <ReceiptCard
              receiptNumber="00042228"
              date="19/06/2025 19:33"
              amount="26 RON"
              retailer="Carrefour"
            />
            <ReceiptCard
              receiptNumber="01044722"
              date="17/06/2025 10:21"
              amount="14 RON"
              retailer="Auchan"
            />

            {/* Archive Button */}
            <button className="bg-black rounded-2xl p-6 min-w-[100px] flex-shrink-0 flex items-center justify-between text-white hover:bg-gray-800 transition-colors">
              <div>
                <p className="text-white text-lg font-euclid-regular">Vezi</p>
                <p className="text-white text-xl font-euclid-bold">Arhiva</p>
              </div>
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Map Section */}
        <MapboxMap />
      </div>
    </div>
  );
} 