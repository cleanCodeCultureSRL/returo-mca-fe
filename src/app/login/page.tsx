'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ThemeColor from '../components/ThemeColor';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser, clearError } from '../../store/slices/authSlice';
import ErrorModal from '../components/ErrorModal';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    try {
      await dispatch(loginUser({ email: formData.email, password: formData.password })).unwrap();
      router.push('/home');
    } catch (error) {
      // Error is handled by Redux state
      console.error('Login error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (error) {
      dispatch(clearError());
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home');
    }
  }, [isAuthenticated, router]);

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log('Forgot password clicked');
  };

  const handleRegister = () => {
    // Navigate to register page
    router.push('/register');
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login
    console.log(`${provider} login clicked`);
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      <ThemeColor color="#D2ECDE" />
      {/* Header Illustration */}
      <div className="bg-primary-light-green h-70 relative overflow-hidden z-10 w-screen left-1/2 transform -translate-x-1/2">
        <Image
          src="/illustrations/login_illustration.png"
          alt="Login Illustration"
          width={400}
          height={200}
          className="w-full h-full object-cover object-center"
          style={{ width: '100vw', minWidth: '100vw' }}
          priority
        />
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6 py-4 -mt-24 z-15">
        <div className="bg-white rounded-t-4xl p-8 pb-24 border-4 border-b-0 border-black -mx-6 -mb-8 min-h-[calc(100vh-220px)]">
          {/* Title */}
          <h1 className="text-3xl font-bold text-black mb-8 font-euclid-bold">Login</h1>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-black font-medium mb-2 font-euclid-regular">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="exemplu@mail.com"
              className="w-full px-4 py-3 rounded-2xl border-2 border-black bg-gray-100 placeholder-gray-400 text-black font-euclid-regular focus:outline-none focus:ring-2 focus:ring-primary-green "
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-black font-medium mb-2 font-euclid-regular">Parola</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Parola"
                className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-black bg-gray-100 placeholder-gray-400 text-black font-euclid-regular focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors touchable-opacity"
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

          {/* Forgot Password */}
          <div className="text-center mb-8">
            <button
              onClick={handleForgotPassword}
              className="text-primary-green font-medium hover:underline font-euclid-bold touchable-opacity"
            >
              Ai uitat parola?
            </button>
          </div>

          {/* Social Login */}
          <div className="text-center mb-6">
            <p className="text-black font-medium mb-4 font-euclid-semibold">sau înregistrează-te cu</p>
            <div className="flex justify-center space-x-4">
              {/* Google */}
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-16 h-16 rounded-3xl flex items-center justify-center hover:bg-yellow-500 transition-colors shadow-lg touchable-opacity"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </button>

              {/* Apple */}
              <button
                onClick={() => handleSocialLogin('apple')}
                className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg touchable-opacity"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <path fill="white" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </button>
            </div>
          </div>


        </div>
      </div>

      {/* Login Button - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-6 z-30">
        {/* Register Link */}
        <div className="text-center mb-4">
          <button
            onClick={handleRegister}
            className="text-black font-bold hover:underline font-euclid-bold touchable-opacity"
          >
            Înregistrare
          </button>
        </div>
        <button
          onClick={handleLogin}
          disabled={isLoading || !formData.email || !formData.password}
          className="w-full bg-black text-white py-4 rounded-3xl border-4 border-black font-bold text-lg hover:bg-gray-800 transition-colors touchable-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Se încarcă...' : 'Login'}
        </button>
      </div>

      {/* Debug component for troubleshooting */}
      {/* <DebugStorage /> */}

      {/* Error Modal */}
      <ErrorModal
        isOpen={!!error}
        message={error || ''}
        onClose={() => dispatch(clearError())}
      />
    </div>
  );
} 