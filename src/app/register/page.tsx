'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ThemeColor from '../components/ThemeColor';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // Navigate to main app
    router.push('/');
  };

  const handleLoginLink = () => {
    // Navigate to login page
    router.push('/login');
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      <ThemeColor color="#D2ECDE" />
      {/* Header Illustration */}
      <div className="bg-primary-light-green h-70 relative overflow-hidden z-10 w-screen left-1/2 transform -translate-x-1/2">
        <Image
          src="/illustrations/login_illustration.png"
          alt="Register Illustration"
          width={400}
          height={200}
          className="w-full h-full object-cover object-center"
          style={{ width: '100vw', minWidth: '100vw' }}
          priority
        />
      </div>

      {/* Register Form */}
      <div className="flex-1 px-6 py-4 -mt-24 z-15">
        <div className="bg-white rounded-t-4xl p-8 pb-24 border-4 border-b-0 border-black -mx-6 -mb-8 min-h-[calc(100vh-220px)]">
          {/* Title */}
          <h1 className="text-3xl font-bold text-black mb-8 font-euclid-bold">Înregistrare</h1>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-black font-medium mb-2 font-euclid-regular">E-mail</label>
            <input
              type="email"
              placeholder="exemplu@mail.com"
              className="w-full px-4 py-3 rounded-2xl border-2 border-black bg-gray-100 placeholder-gray-400 text-black font-euclid-regular focus:outline-none focus:ring-2 focus:ring-primary-green"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-black font-medium mb-2 font-euclid-regular">Parola</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Parola"
                className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-black bg-gray-100 placeholder-gray-400 text-black font-euclid-regular focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  // Eye open icon
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  // Eye closed icon
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-black font-medium mb-2 font-euclid-regular">Confirmă parola</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmă parola"
                className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-black bg-gray-100 placeholder-gray-400 text-black font-euclid-regular focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? (
                  // Eye open icon
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  // Eye closed icon
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="text-center mb-8">
            <p className="text-black font-medium text-sm font-euclid-regular">
              Prin înregistrare, ești de acord cu{' '}
              <span className="text-primary-green font-euclid-bold">Termenii și Condițiile noastre</span>
              {' '}și cu{' '}
              <span className="text-primary-green font-euclid-bold">Politica de Confidențialitate</span>
            </p>
          </div>


        </div>
      </div>

      {/* Register Button - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-6 z-30">
        {/* Login Link */}
        <div className="text-center mb-4">
          <button
            onClick={handleLoginLink}
            className="text-black font-bold hover:underline font-euclid-bold"
          >
            Intră în cont
          </button>
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-4 rounded-3xl border-4 border-black font-bold text-lg hover:bg-gray-800 transition-colors font-euclid-bold"
        >
          Înregistrează-te
        </button>
      </div>
    </div>
  );
} 