'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { primary, text, yellow } from '../styles/colors';
import ThemeColor from '../components/ThemeColor';
import TransactionItem from '../components/TransactionItem';
import Header from '../components/Header';

export default function WalletPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/home');
  };

  const handleViewArchive = () => {
    router.push('/voucher-history');
  };

  const handleTransfer = () => {
    router.push('/transfer');
  };

  const handleDonate = () => {
    router.push('/donate');
  };

  const transactions = [
    { retailer: 'Kaufland', receiptNumber: '00044728', amount: '47,5 RON', time: '17/02/2025 13:47' },
    { retailer: 'Carrefour', receiptNumber: '00098432', amount: '23,5 RON', time: '19/02/2025 10:32' },
    { retailer: 'Auchan', receiptNumber: '00156789', amount: '156,5 RON', time: '17/02/2025 16:18' },
    { retailer: 'Mega Image', receiptNumber: '00067291', amount: '31 RON', time: '17/02/2025 09:15' },
  ];

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: primary.lightGreen }}>
      <ThemeColor color="#D2ECDE" />

      {/* Header */}
      <Header showTitle={true} title="Portofel" />

      {/* Main Content */}
      <div className="px-4 pb-4 space-y-6">
        {/* Balance Card */}
        <div className="bg-black rounded-3xl relative overflow-hidden">
          {/* Green Card - Top Section */}
          <div className="bg-primary-green rounded-3xl p-4 relative overflow-hidden mb-2 border-3 border-black">
            {/* Illustration */}
            <div className="absolute -bottom-2 -right-1 w-24 h-30 z-20">
              <Image
                src="/illustrations/wallet_illustration.png"
                alt="Wallet illustration"
                width={96}
                height={120}
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className="text-white text-lg font-euclid-semibold mb-2">Soldul tău total</h2>

            <div className="text-black text-4xl font-azo-bold">
              345,5 <span className="text-xl font-azo-regular">Ron</span>
            </div>

            <p className="text-black text-sm font-euclid-semibold"></p>
          </div>

          {/* Bottom Section - Monthly Balance */}
          <div className="px-4 pb-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-euclid-regular" style={{ color: text.subtitle }}>Soldul luna actuala</span>
                <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">?</span>
                </div>
              </div>
              <span className="text-sm font-euclid-semibold" style={{ color: text.subtitle }}>19,5 %</span>
            </div>
            <div className="text-2xl font-azo-bold mb-2" style={{ color: yellow }}>
              222 <span className="text-base font-azo-regular">Ron</span>
            </div>
            {/* Chart Icon */}
            <div className="absolute bottom-4 right-4">
              <Image
                src="/icons/wallet_statistics_icon.png"
                alt="Wallet statistics"
                width={32}
                height={24}
                className="w-8 h-6"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          {/* Transfer Button */}
          <button
            onClick={handleTransfer}
            className="flex-1 bg-black rounded-4xl h-[62px] flex items-center hover:bg-gray-800 transition-colors touchable-opacity"
          >
            <div className="flex-1 px-4 py-3">
              <p className="text-l font-euclid-semibold text-left" style={{ color: primary.green }}>Transferă</p>
              <p className="text-white text-sm font-euclid-regular text-left">sold</p>
            </div>
            <div className="w-[63px] h-[63px] bg-white rounded-full flex items-center justify-center border-5 border-white">
              <Image
                src="/icons/transfer_icon.png"
                alt="Transfer"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
          </button>

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            className="flex-1 bg-black rounded-4xl h-[62px] flex items-center hover:bg-gray-800 transition-colors touchable-opacity"
          >
            <div className="flex-1 px-4 py-3">
              <p className="text-l font-euclid-semibold text-left" style={{ color: primary.green }}>Donează</p>
              <p className="text-white text-sm font-euclid-regular text-left">sold</p>
            </div>
            <div className="w-[63px] h-[63px]  bg-white rounded-full flex items-center justify-center border-2 border-white">
              <Image
                src="/icons/donate_icon.png"
                alt="Donate"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
          </button>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-3xl border-2 border-black ">
          {/* Transaction List */}
          <div className=" p-4">
            {transactions.map((transaction, index) => (
              <div key={index}>
                <TransactionItem
                  receiptNumber={transaction.receiptNumber}
                  time={transaction.time}
                  amount={transaction.amount}
                  retailer={transaction.retailer}
                />
                {index < transactions.length - 1 && (
                  <div className="h-0.5  my-2" style={{ backgroundColor: '#8C9E9429' }}></div>
                )}
              </div>
            ))}
          </div>

          {/* Archive Button */}
          <button
            onClick={handleViewArchive}
            className="w-full bg-black text-white py-2 rounded-b-2xl font-euclid-bold text-lg"
          >
            Vezi arhiva
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-8 left-0 right-0 flex items-center justify-between px-6 z-50">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg touchable-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Scan Button */}
        <button
          onClick={() => router.push('/scanner')}
          className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg touchable-opacity"
        >
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
    </div >
  );
} 