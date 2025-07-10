'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ThemeColor from '../components/ThemeColor';

export default function OnboardingScreen3() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/onboarding_screen_2');
  };

  const handleNext = () => {
    // Navigate to login page
    router.push('/login');
  };
  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      <ThemeColor color="#ffffff" />

      {/* Main Content Area */}
      <div className="flex-1 relative px-6 pt-16">
        {/* Top Bordered Card with Title and Illustration */}
        <div className="absolute inset-x-6 top-6 bottom-0 flex flex-col">
          <div className="bg-white-50 rounded-4xl pt-8 px-8 flex-1 flex flex-col z-10">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary-green font-euclid-bold">Pasul 3</h1>
            </div>

            {/* Illustration */}
            <div className="flex-1 flex items-end justify-center mt-10">
              <Image
                src="/illustrations/onboarding_step3_illustration.png"
                alt="Step 3 Illustration"
                width={280}
                height={280}
                className="max-w-full h-auto mb-[5%]"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="bg-primary-light-green rounded-t-4xl px-6 py-8 h-102 z-20">
        {/* White Inner Card */}
        <div className="bg-white rounded-4xl p-8 mb-6 border-4 border-black min-h-[200px]">
          <div className="text-center">
            <h2 className="text-xl font-bold text-black mb-4 font-euclid-bold">Folosește punctele câștigate</h2>
            <p className="text-gray-700 text-base leading-relaxed font-euclid-regular">
              Transformă punctele acumulate în recompense și beneficii speciale la partenerii noștri
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Footer - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary-light-green px-6 py-6 z-30">
        <div className="flex items-center justify-between relative">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="bg-black text-white px-4 py-3 rounded-full border-4 border-black hover:bg-gray-800 transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 5L8.5 12L15.5 19"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Progress Dots - Centered on entire screen */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-8 h-3 bg-white rounded-full"></div>
            <div className="w-8 h-3 bg-white rounded-full"></div>
            <div className="w-8 h-3 bg-primary-green rounded-full"></div>
          </div>

          {/* Reciclează Button */}
          <button
            onClick={handleNext}
            className="bg-black text-white px-4 py-3 rounded-full border-4 border-black hover:bg-gray-800 transition-colors font-bold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
} 