'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { primary, yellow, text } from '../styles/colors';
import ReceiptCard from '../components/ReceiptCard';
import MapboxMap from '../components/MapboxMap';
import Header from '../components/Header';
import ThemeColor from '../components/ThemeColor';

interface Receipt {
  receiptNumber: string;
  date: string;
  amount: string;
  retailer: string;
  status: 'disponibile' | 'utilizate' | 'expirate';
}

export default function HomePage() {
  const router = useRouter();
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleMapClick = () => {
    router.push('/map');
  };

  const handleReceiptSelect = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReceipt(null);
  };

  const handleUseVoucher = () => {
    // Handle voucher usage logic here
    console.log('Using voucher:', selectedReceipt);
    handleCloseModal();
  };

  // Receipt data matching the ReceiptCard props
  const receipts: Receipt[] = [
    {
      receiptNumber: '00044728',
      date: '17/06/2025 13:47',
      amount: '9 RON',
      retailer: 'Kaufland',
      status: 'disponibile'
    },
    {
      receiptNumber: '00042228',
      date: '19/06/2025 19:33',
      amount: '26 RON',
      retailer: 'Carrefour',
      status: 'disponibile'
    },
    {
      receiptNumber: '01044722',
      date: '17/06/2025 10:21',
      amount: '14 RON',
      retailer: 'Auchan',
      status: 'utilizate'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: primary.lightGreen }}>
      <ThemeColor color="#D2ECDE" />
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="px-4 pb-4 space-y-6 mt-1">
        {/* Environmental Impact Card */}
        <div className="bg-black rounded-3xl relative overflow-hidden">
          {/* Green Card - Top Section */}
          <div className="bg-primary-green rounded-3xl p-4 relative overflow-hidden mb-2 border-3 border-black">
            {/* Homepage Illustration */}
            <div className="absolute -top-0 -right-1 w-20 h-24 z-20">
              <Image
                src="/illustrations/homepage_illustration.png"
                alt="Homepage illustration"
                width={80}
                height={96}
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className="text-white text-2xl font-euclid-bold mb-6">Ai salvat planeta:</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-black text-5xl font-azo-bold">20,73<span className="text-2xl font-azo-regular">kg</span></div>

                <p className="text-black text-sm font-euclid-bold">Mai puțin CO₂</p>
              </div>
              <div className="border-l-2 border-black pl-4">
                <div className="text-black text-5xl font-azo-bold">691<span className="text-2xl font-azo-regular"></span></div>
                <p className="text-black text-sm font-euclid-bold">Peturi reciclate</p>
              </div>
            </div>
          </div>

          {/* Progress Bar - Bottom Section */}
          <div className="px-4 pb-2">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-euclid-regular" style={{ color: text.subtitle }}>Provocarea lunara</span>
              <span className="text-sm font-euclid-semibold" style={{ color: yellow }}>100</span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div className="h-3 rounded-full" style={{ backgroundColor: yellow, width: '80.6%' }}></div>
              </div>
              <div className="absolute -top-8 left-[80.6%] transform -translate-x-1/2">
                <div>
                  <span className="text-white text-sm font-azo-bold">80</span>
                  <Image
                    src="/icons/progress_bar_icon.png"
                    alt="Progress"
                    width={14}
                    height={14}
                    className="ml-1 mb-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Recycling */}
        <div>
          <h3 className="text-black text-xl font-euclid-bold mb-4">Ultimele reciclări</h3>

          <div className="flex space-x-4 overflow-x-auto pb-4">
            {/* Receipt Cards */}
            {receipts.map((receipt, index) => (
              <div key={index} onClick={() => handleReceiptSelect(receipt)} className="cursor-pointer">
                <ReceiptCard
                  receiptNumber={receipt.receiptNumber}
                  date={receipt.date}
                  amount={receipt.amount}
                  retailer={receipt.retailer}
                  status={receipt.status}
                />
              </div>
            ))}

            {/* Archive Button */}
            <button
              onClick={() => router.push('/voucher-history')}
              className="bg-black rounded-2xl p-6 min-w-[100px] flex-shrink-0 flex items-center justify-between text-white hover:bg-gray-800 transition-colors touchable-opacity"
            >
              <div>
                <p className="text-white text-lg font-euclid-regular">Vezi</p>
                <p className="text-white text-xl font-euclid-bold">Arhiva</p>
              </div>
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Map Section */}
        <div onClick={handleMapClick} className="cursor-pointer">
          <MapboxMap />
        </div>
      </div>

      {/* Scan Button - Always visible at bottom center */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={() => router.push('/scanner')}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg touchable-opacity"
        >
          <Image
            src="/icons/open_camera_icon.png"
            alt="Scan"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Receipt Modal */}
      {showModal && selectedReceipt && (
        <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
          {/* Invisible backdrop for click outside to close */}
          <div
            className="absolute inset-0 pointer-events-auto"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white rounded-t-4xl p-6 animate-slide-up pointer-events-auto shadow-2xl border-3 border-black">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/icons/receipt_icon.png"
                    alt="Receipt"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span className="text-lg font-bold text-black">{selectedReceipt.receiptNumber}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                    src="/icons/retailer_location_icon.png"
                    alt="Receipt"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span className="text-lg font-bold text-black">{selectedReceipt.retailer}</span>
                </div>
              </div>

              {/* Voucher Amount */}
              <div className="text-center">
                <div className="text-3xl font-bold text-black">{selectedReceipt.amount}</div>
                <div className="text-sm text-gray-600 mt-1">Valoarea voucher-ului</div>
              </div>
            </div>

            {/* Barcode */}
            <div className="flex flex-col items-center mb-8">
              <div className="bg-white p-4 rounded-lg">
                {/* Barcode lines */}
                <div className="flex justify-center mb-2">
                  <Image
                    src="/barcode.png"
                    alt="Barcode"
                    width={200}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div className="text-center text-lg font-bold text-black tracking-wider">
                  896312450834
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCloseModal}
                className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg touchable-opacity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={handleUseVoucher}
                className="flex-1 bg-black text-white py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-colors touchable-opacity"
              >
                Utilizeaza
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 