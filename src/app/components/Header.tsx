'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { yellow } from '../styles/colors';

interface HeaderProps {
  userName?: string;
  balance?: string;
  currency?: string;
  showTitle?: boolean;
  title?: string;
}

export default function Header({ userName, balance, currency, showTitle, title }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleMenuItemClick = (label: string) => {
    switch (label) {
      case 'Portofel':
        router.push('/wallet');
        break;
      case 'Logout':
        router.push('/login');
        break;
      default:
        // Handle other menu items as needed
        console.log(`Clicked on ${label}`);
        break;
    }
    setIsMenuOpen(false); // Close menu after navigation
  };

  const menuItems = [
    { icon: '/icons/notificari_icon.png', label: 'Notificari', badge: '2', color: 'text-green-400' },
    { icon: '/icons/portofel_icon.png', label: 'Portofel', color: 'text-green-400' },
    { icon: '/icons/provocari_icon.png', label: 'Provocari', color: 'text-green-400' },
    { icon: '/icons/profil_icon.png', label: 'Profil', color: 'text-green-400' },
    { icon: '/icons/provocari_icon.png', label: 'Invita prieteni', color: 'text-green-400' },
    { icon: '/icons/setari_icon.png', label: 'Setari', color: 'text-green-400' },
    { icon: '/icons/ajutor_icon.png', label: 'Ajutor', color: 'text-green-400' },
    { icon: '/icons/logout_icon.png', label: 'Logout', color: 'text-red-400' },
  ];

  return (
    <>
      <div className="p-4 pt-6">
        <div className="flex items-center justify-between">
          {showTitle ? (
            /* Page Title */
            <h1 className="text-black text-2xl font-azo-bold ml-2">{title}</h1>
          ) : (
            /* Profile Section - Floating Pill */
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
                <p className="text-white text-sm font-euclid-regular">Soldul tău, <span className="font-euclid-bold">{userName}</span></p>
                <div className="flex items-center">
                  <Image
                    src="/icons/wallet_icon.png"
                    alt="Wallet"
                    width={18}
                    height={18}
                    className="w-[18px] h-[14px] mr-1"
                  />
                  <span className="text-white text-lg font-euclid-bold">{balance}</span>
                  <span className="text-white text-sm ml-1 font-euclid-regular">{currency}</span>
                </div>
              </div>
            </div>
          )}

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

      {/* Invisible overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <div className={`fixed top-0 right-0 h-full w-[70%] bg-black transform rounded-l-3xl transition-transform duration-300 ease-in-out z-[9999] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          {/* Menu Items */}
          <div className="flex-1 px-6 py-8 space-y-6">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 cursor-pointer hover:bg-gray-800 p-3 rounded-lg transition-colors"
                onClick={() => handleMenuItemClick(item.label)}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {item.icon.startsWith('/icons/') ? (
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  ) : (
                    <div className={`text-2xl ${item.color}`}>
                      {item.icon}
                    </div>
                  )}
                </div>
                <span className="text-white text-l font-euclid-bold flex-1">{item.label}</span>
                {item.badge && (
                  <div className="bg-yellow-400 text-black text-sm font-euclid-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {item.badge}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Close Button */}
          <div className="p-6 pb-8 flex justify-center">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 