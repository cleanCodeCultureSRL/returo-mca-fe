'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
      {/* Header Illustration */}
      <div className="bg-primary-light-green h-64 relative overflow-hidden z-10 w-screen left-1/2 transform -translate-x-1/2">
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
      <div className="flex-1 px-6 py-4 -mt-20 z-15">
        <div className="bg-white rounded-t-4xl p-8 pb-24 border-4 border-b-0 border-black -mx-6 -mb-8 min-h-[calc(100vh-200px)]">
          {/* Title */}
          <h1 className="text-3xl font-bold text-black mb-8">Înregistrare</h1>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-black font-medium mb-2">E-mail</label>
            <input
              type="email"
              placeholder="exemplu@mail.com"
              className="w-full px-4 py-3 rounded-full border-2 border-black bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-black font-medium mb-2">Parola</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Parola"
                className="w-full px-4 py-3 pr-12 rounded-full border-2 border-black bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? '👁️' : '😴'}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-black font-medium mb-2">Confirmă parola</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmă parola"
                className="w-full px-4 py-3 pr-12 rounded-full border-2 border-black bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? '👁️' : '😴'}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="text-center mb-8">
            <p className="text-black font-medium text-sm">
              Prin înregistrare, ești de acord cu{' '}
              <span className="text-primary-green font-bold">Termenii și Condițiile noastre</span>
              {' '}și cu{' '}
              <span className="text-primary-green font-bold">Politica de Confidențialitate</span>
            </p>
          </div>

          {/* Login Link */}
          <div className="text-center mb-8">
            <button
              onClick={handleLoginLink}
              className="text-black font-bold hover:underline"
            >
              Intră în cont
            </button>
          </div>
        </div>
      </div>

      {/* Register Button - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-6 z-30">
        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-4 rounded-full border-4 border-black font-bold text-lg hover:bg-gray-800 transition-colors"
        >
          Înregistrează-te
        </button>
      </div>
    </div>
  );
} 