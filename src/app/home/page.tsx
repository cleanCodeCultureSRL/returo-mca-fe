'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { primary, yellow, text } from '../styles/colors';
import ReceiptCard from '../components/ReceiptCard';
import MapboxMap from '../components/MapboxMap';
import Header from '../components/Header';

export default function HomePage() {
  const router = useRouter();

  const handleMapClick = () => {
    router.push('/map');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: primary.lightGreen }}>
      {/* Header */}
      <Header userName="Andrei" balance="1.832,05" currency="Ron" />

      {/* Main Content */}
      <div className="px-4 pb-4 space-y-6 mt-4">
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
        <div onClick={handleMapClick} className="cursor-pointer">
          <MapboxMap />
        </div>
      </div>

      {/* Scan Button - Always visible at bottom center */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg">
          <Image
            src="/icons/open_camera_icon.png"
            alt="Scan"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
} 