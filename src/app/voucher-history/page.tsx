'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { primary } from '../styles/colors';
import ThemeColor from '../components/ThemeColor';
import ReceiptCard from '../components/ReceiptCard';
import Header from '../components/Header';

interface Voucher {
  receiptNumber: string;
  date: string;
  amount: string;
  retailer: string;
}

export default function VoucherHistoryPage() {
  const router = useRouter();
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleBack = () => {
    router.push('/home');
  };

  const handleVoucherSelect = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVoucher(null);
  };

  const handleUseVoucher = () => {
    // Handle voucher usage logic here
    console.log('Using voucher:', selectedVoucher);
    handleCloseModal();
  };

  const vouchers = [
    {
      receiptNumber: '00044728',
      date: '17/06/2025 13:47:02',
      amount: '47,5 RON',
      retailer: 'Kaufland'
    },
    {
      receiptNumber: '00098432',
      date: '16/06/2025 10:32:15',
      amount: '23,5 RON',
      retailer: 'Carrefour'
    },
    {
      receiptNumber: '00156789',
      date: '15/06/2025 16:18:43',
      amount: '156,5 RON',
      retailer: 'Auchan'
    },
    {
      receiptNumber: '00067291',
      date: '14/06/2025 09:15:28',
      amount: '31 RON',
      retailer: 'Mega Image'
    },
    {
      receiptNumber: '00034567',
      date: '13/06/2025 14:22:10',
      amount: '18,5 RON',
      retailer: 'Profi'
    },
    {
      receiptNumber: '00044728',
      date: '17/06/2025 13:47:02',
      amount: '47,5 RON',
      retailer: 'Kaufland'
    },
    {
      receiptNumber: '00098432',
      date: '16/06/2025 10:32:15',
      amount: '23,5 RON',
      retailer: 'Carrefour'
    },
    {
      receiptNumber: '00156789',
      date: '15/06/2025 16:18:43',
      amount: '156,5 RON',
      retailer: 'Auchan'
    },
    {
      receiptNumber: '00067291',
      date: '14/06/2025 09:15:28',
      amount: '31 RON',
      retailer: 'Mega Image'
    },
    {
      receiptNumber: '00034567',
      date: '13/06/2025 14:22:10',
      amount: '18,5 RON',
      retailer: 'Profi'
    },
  ];

  return (
    <div className="h-screen flex flex-col relative" style={{ backgroundColor: primary.lightGreen }}>
      <ThemeColor color="#D2ECDE" />

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-40" style={{ backgroundColor: primary.lightGreen }}>
        <Header showTitle={true} title="Arhiva vouchere" />
      </div>

      {/* Fixed Filter Tabs */}
      <div className="fixed top-22 left-0 right-0 z-30 flex space-x-2 pt-4 px-4 pb-4" style={{ backgroundColor: primary.lightGreen }}>
        <button
          className="text-black px-2 py-3 rounded-2xl text-base font-euclid-semibold flex-1"
          style={{ backgroundColor: primary.green }}
        >
          Disponibile
        </button>
        <button className="bg-white text-black px-2 py-3 rounded-2xl text-base font-euclid-semibold flex-1">
          Utilizate
        </button>
        <button className="bg-white text-black px-2 py-3 rounded-2xl text-base font-euclid-semibold flex-1">
          Expirate
        </button>
      </div>

      {/* Scrollable Voucher History */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 pt-44">
        <div className="space-y-4">
          {vouchers.map((voucher, index) => (
            <div key={index} onClick={() => handleVoucherSelect(voucher)} className="cursor-pointer">
              <ReceiptCard
                receiptNumber={voucher.receiptNumber}
                date={voucher.date}
                amount={voucher.amount}
                retailer={voucher.retailer}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-8 left-0 right-0 flex items-center justify-between px-6 z-50">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Scan Button */}
        <button className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg">
          <Image
            src="/icons/open_camera_icon.png"
            alt="Scan"
            width={24}
            height={24}
            className="w-6 h-6 filter brightness-0 invert"
          />
        </button>

        {/* Spacer for symmetry */}
        <div className="w-16 h-16"></div>
      </div>

      {/* Voucher Modal */}
      {showModal && selectedVoucher && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-end justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-t-4xl w-full mb-0 p-6 animate-slide-up shadow-2xl border-3 border-black"
            onClick={(e) => e.stopPropagation()}
          >
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
                  <span className="text-lg font-bold text-black">{selectedVoucher.receiptNumber}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                    src="/icons/retailer_location_icon.png"
                    alt="Receipt"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span className="text-lg font-bold text-black">{selectedVoucher.retailer}</span>
                </div>
              </div>

              {/* Voucher Amount */}
              <div className="text-center">
                <div className="text-3xl font-bold text-black">{selectedVoucher.amount}</div>
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
                className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={handleUseVoucher}
                className="flex-1 bg-black text-white py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-colors"
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