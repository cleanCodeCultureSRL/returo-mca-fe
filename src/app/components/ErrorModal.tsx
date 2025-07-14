'use client';

import { useEffect } from 'react';

interface ErrorModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export default function ErrorModal({ isOpen, message, onClose }: ErrorModalProps) {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 border-4 border-black">
        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Error Title */}
        <h3 className="text-xl font-bold text-center text-black mb-3 font-euclid-bold">
          Eroare
        </h3>

        {/* Error Message */}
        <p className="text-center text-black mb-6 font-euclid-regular">
          {message}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-black text-white py-3 rounded-2xl border-2 border-black font-bold text-lg hover:bg-gray-800 transition-colors touchable-opacity font-euclid-bold"
        >
          Închide
        </button>
      </div>
    </div>
  );
} 