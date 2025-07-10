'use client';

import { useState } from 'react';
import Image from 'next/image';
import { yellow } from '../styles/colors';

interface HeaderProps {
  userName: string;
  balance: string;
  currency: string;
}

export default function Header({ userName, balance, currency }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="p-4 pt-6">
      <div className="flex items-center justify-between">
        {/* Profile Section - Floating Pill */}
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
  );
} 