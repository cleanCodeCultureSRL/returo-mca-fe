'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { primary } from '../styles/colors';
import Header from '../components/Header';
import ThemeColor from '../components/ThemeColor';

export default function InviteAFriendPage() {
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState(false);

  const inviteLink = "https://invite.returosgr.ro/andrei123";

  const handleBack = () => {
    router.push('/home');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleSend = () => {
    // Handle send functionality
    console.log('Send invite');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: primary.lightGreen }}>
      <ThemeColor color="#D2ECDE" />

      {/* Header - Same as home page */}
      <Header userName="Andrei" balance="1.832,05" currency="Ron" />

      {/* Main Content */}
      <div className="px-4 pb-4 space-y-6 mt-4">
        {/* Invite Card */}
        <div className="bg-white rounded-3xl border-3 border-black pt-6 pl-6 pr-6 relative overflow-hidden">
          {/* Title */}
          <h2 className="text-black text-3xl font-euclid-bold mb-4">Invita prieteni</h2>

          {/* Description */}
          <p className="text-black text-lg font-euclid-regular mb-6 leading-relaxed">
            Invită-ți prietenii să se alăture platformei RetuRO și să contribuie la un mediu mai curat împreună
          </p>

          {/* Invite Link */}
          <div className="relative mb-8">
            <div className="bg-gray-100 rounded-full p-4 pr-16 border-2 border-black">
              <span className="text-black text-base font-euclid-regular">
                {inviteLink}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-primary-green rounded-full flex items-center justify-center touchable-opacity"
            >
              {copySuccess ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <div className="relative w-64 h-48">
              <Image
                src="/illustrations/invite_illustration.png"
                alt="Invite illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-8 left-0 right-0 flex items-center justify-between px-6 z-50">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center touchable-opacity shadow-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="flex-1 bg-black text-white py-4 px-8 rounded-full text-lg font-euclid-bold touchable-opacity shadow-lg ml-4"
        >
          Trimite
        </button>
      </div>
    </div>
  );
} 