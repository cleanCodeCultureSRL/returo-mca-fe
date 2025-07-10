'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ThemeColor from '../components/ThemeColor';

export default function ScannerPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Nu se poate accesa camera. Vă rugăm să acordați permisiunea pentru cameră.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleBack = () => {
    router.push('/home');
  };

  const handleCapture = () => {
    // TODO: Implement barcode scanning logic
    console.log('Capture/Scan button pressed');
    setShowSuccessModal(true);
  };

  const handleGallery = () => {
    // TODO: Implement gallery selection
    console.log('Gallery button pressed');
  };

  const handleViewArchive = () => {
    router.push('/voucher-history');
  };

  const handleScanAnother = () => {
    setShowSuccessModal(false);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center p-4">
          <p className="mb-4">{error}</p>
          <button
            onClick={() => router.push('/home')}
            className="bg-white text-black px-4 py-2 rounded-lg"
          >
            Înapoi
          </button>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
            <div className="bg-black text-white rounded-t-3xl w-full max-w-md p-6 space-y-6">
              {/* Success Illustration */}
              <div className="flex justify-center">
                <div className="relative">
                  <svg width="120" height="120" viewBox="0 0 120 120" className="text-green-500">
                    <circle cx="60" cy="60" r="60" fill="currentColor" opacity="0.9" />
                    <circle cx="60" cy="60" r="40" fill="currentColor" />
                    <path d="M45 60l10 10 20-20" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {/* Person illustration */}
                  <div className="absolute -bottom-2 -right-2">
                    <svg width="60" height="60" viewBox="0 0 60 60" className="text-white">
                      <circle cx="30" cy="20" r="8" fill="currentColor" />
                      <path d="M15 55 L45 55 L40 35 L20 35 Z" fill="currentColor" />
                      <rect x="25" y="28" width="10" height="20" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div className="text-center space-y-4">
                <p className="text-lg font-euclid-regular leading-relaxed">
                  Voucherul a fost adăugat în arhiva lorem ipsum sit dolor, sit amet, consectetur
                </p>

                {/* View Archive Button */}
                <button
                  onClick={handleViewArchive}
                  className="text-white text-lg font-euclid-semibold underline hover:opacity-80 transition-opacity"
                >
                  Vezi arhiva
                </button>
              </div>

              {/* Scan Another Button */}
              <button
                onClick={handleScanAnother}
                className="w-full bg-white text-black py-4 rounded-full text-lg font-euclid-bold hover:bg-gray-100 transition-colors"
              >
                Scanează alt voucher
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ThemeColor color="black" />
      {/* Top Disclaimer */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="p-6 pt-12">
          <p className="text-white text-lg font-euclid-regular leading-relaxed">
            Scaneaza voucherul lorem ipsum sit dolor, sit amet, consectetur adipiscing elit
          </p>
        </div>
      </div>

      {/* Camera View */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Barcode Scanning Rectangle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Yellow Rectangle Border */}
            <div className="w-80 h-48 border-4 border-yellow-400 rounded-lg relative">
              {/* Corner indicators */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-400 rounded-tl-lg"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-400 rounded-tr-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-400 rounded-bl-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-400 rounded-br-lg"></div>

              {/* Scanning line animation */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400 animate-pulse"></div>
              </div>
            </div>

            {/* Instruction text */}
            <p className="text-white text-center mt-4 font-euclid-regular">
              Poziționează codul de bare în dreptunghi
            </p>
          </div>
        </div>

        {/* Dark overlay around scanning area */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-6 z-30">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="w-16 h-16 bg-white/90 text-black rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Scan/Capture Button */}
        <button
          onClick={handleCapture}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg border-4 border-white"
        >
          <div className="w-16 h-16 bg-transparent border-2 border-black rounded-full"></div>
        </button>

        {/* Gallery Button */}
        <button
          onClick={handleGallery}
          className="w-16 h-16 bg-white/90 text-black rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </button>
      </div>
    </div>
  );
} 