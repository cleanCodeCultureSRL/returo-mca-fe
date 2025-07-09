'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding_screen_1');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-primary-green flex flex-col items-center justify-center z-50 overflow-hidden">
      <div className="absolute inset-0 flex items-start justify-center pt-70">
        <div className="animate-fade-in">
          <Image
            src="/logo.png"
            alt="RetuRO Logo"
            width={300}
            height={120}
            className="max-w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Bottom Illustrations */}
      <div className="absolute inset-0 w-full">
        {/* Left Illustration */}
        <div className="absolute left-0 bottom-0">
          <Image
            src="/illustrations/splashscreen_illustration_left.png"
            alt="Left Illustration"
            width={720}
            height={1080}
            className="max-w-full h-auto animate-slide-up-left"
            priority
          />
        </div>

        {/* Center Illustration */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-screen flex justify-center">
          <Image
            src="/illustrations/splashscreen_illustration_bottom_center.png"
            alt="Center Illustration"
            width={3000}
            height={2700}
            className="animate-slide-up-center w-full max-w-none h-auto object-cover"
            style={{ minWidth: '100vw', minHeight: '60vh' }}
            priority
          />
        </div>

        {/* Right Illustration */}
        <div className="absolute right-0 bottom-0">
          <Image
            src="/illustrations/splashscreen_illustration_right.png"
            alt="Right Illustration"
            width={360}
            height={540}
            className="max-w-full h-auto animate-slide-up-right"
            priority
          />
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up-left {
          from { opacity: 0; transform: translateY(200px) translateX(-50px); }
          to { opacity: 1; transform: translateY(0) translateX(0); }
        }
        
        @keyframes slide-up-center {
          from { opacity: 0; transform: translateY(300px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up-right {
          from { opacity: 0; transform: translateY(200px) translateX(50px); }
          to { opacity: 1; transform: translateY(0) translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up-left {
          animation: slide-up-left 1.2s ease-out 1.2s both;
        }
        
        .animate-slide-up-center {
          animation: slide-up-center 1.2s ease-out 1.4s both;
        }
        
        .animate-slide-up-right {
          animation: slide-up-right 1.2s ease-out 1.6s both;
        }
      `}</style>
    </div>
  );
}
