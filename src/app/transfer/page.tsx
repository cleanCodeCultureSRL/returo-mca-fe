'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { primary } from '../styles/colors';
import ThemeColor from '../components/ThemeColor';
import Header from '../components/Header';

interface Transaction {
  id: string;
  iban: string;
  date: string;
  amount: string;
  groupDate: string;
  isNewDay?: boolean;
}

export default function TransferPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryIban, setBeneficiaryIban] = useState('');
  const [amount, setAmount] = useState('');

  const handleBack = () => {
    router.push('/wallet');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTransfer = () => {
    // Handle transfer logic here
    console.log('Transfer:', { beneficiaryName, beneficiaryIban, amount });
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    // Reset form fields
    setBeneficiaryName('');
    setBeneficiaryIban('');
    setAmount('');
  };

  const transactions: Transaction[] = [
    {
      id: '1',
      iban: 'RO49AAAA1B31007593840000',
      date: '04 Iun 2024',
      amount: '89,5 RON',
      groupDate: '04 Iun • Joi',
      isNewDay: true
    },
    {
      id: '2',
      iban: 'RO12BRDE445SV08468980000',
      date: '04 Iun 2024',
      amount: '126 RON',
      groupDate: '04 Iun • Joi'
    },
    {
      id: '3',
      iban: 'RO36BTRL01304205F73F0000',
      date: '04 Iun 2024',
      amount: '67,5 RON',
      groupDate: '04 Iun • Joi'
    },
    {
      id: '4',
      iban: 'RO49AAAA1B31007593840000',
      date: '03 Iun 2024',
      amount: '42,5 RON',
      groupDate: '03 Iun • Luni',
      isNewDay: true
    },
    {
      id: '5',
      iban: 'RO12BRDE445SV08468980000',
      date: '03 Iun 2024',
      amount: '203,5 RON',
      groupDate: '03 Iun • Luni'
    },
    {
      id: '6',
      iban: 'RO36BTRL01304205F73F0000',
      date: '11 Mai 2024',
      amount: '78,5 RON',
      groupDate: '11 Mai • Duminica',
      isNewDay: true
    },
    {
      id: '7',
      iban: 'RO49AAAA1B31007593840000',
      date: '11 Mai 2024',
      amount: '34,5 RON',
      groupDate: '11 Mai • Duminica'
    },
    {
      id: '8',
      iban: 'RO12BRDE445SV08468980000',
      date: '11 Mai 2024',
      amount: '92 RON',
      groupDate: '11 Mai • Duminica'
    },
    {
      id: '9',
      iban: 'RO36BTRL01304205F73F0000',
      date: '10 Mai 2024',
      amount: '56,5 RON',
      groupDate: '10 Mai • Vineri',
      isNewDay: true
    },
    {
      id: '10',
      iban: 'RO49AAAA1B31007593840000',
      date: '10 Mai 2024',
      amount: '129 RON',
      groupDate: '10 Mai • Vineri'
    },
    {
      id: '11',
      iban: 'RO45CECE123456789012000',
      date: '29 Apr 2024',
      amount: '45,5 RON',
      groupDate: '29 Apr • Luni',
      isNewDay: true
    },
    {
      id: '12',
      iban: 'RO78RZBR987654321098700',
      date: '29 Apr 2024',
      amount: '76,5 RON',
      groupDate: '29 Apr • Luni'
    },
    {
      id: '13',
      iban: 'RO23INGB112233445566700',
      date: '29 Apr 2024',
      amount: '30 RON',
      groupDate: '29 Apr • Luni'
    },
    {
      id: '14',
      iban: 'RO56TREZ554433221100900',
      date: '15 Apr 2024',
      amount: '134,5 RON',
      groupDate: '15 Apr • Luni',
      isNewDay: true
    },
    {
      id: '15',
      iban: 'RO89BREL776655443322100',
      date: '15 Apr 2024',
      amount: '87,5 RON',
      groupDate: '15 Apr • Luni'
    }
  ];

  return (
    <div className="h-screen flex flex-col relative" style={{ backgroundColor: primary.lightGreen }}>
      <ThemeColor color="#D2ECDE" />

      {/* Fixed Header */}
      <Header showTitle={true} title="Transferă" />


      {/* Fixed Balance Card */}
      <div className="px-4 pb-4">
        <div className="bg-black rounded-2xl p-4">
          <div className="flex items-center mb-2">
            <span className="text-white text-lg font-euclid-semibold">Soldul tău</span>
          </div>
          <div className="flex items-center">
            <Image
              src="/icons/wallet_yellow_icon.png"
              alt="Transfer"
              width={24}
              height={24}
              className="w-[24px] h-[18px] mr-3"
            />
            <div className="text-white text-4xl font-azo-bold">265,5 <span className="text-2xl">Ron</span></div>
          </div></div>
      </div>

      {/* Scrollable Transaction Reports */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="bg-white rounded-2xl p-4 border-2 border-black">
          <h2 className="text-black text-lg font-euclid-bold mb-4">Rapoarte tranzacții</h2>

          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                {transaction.isNewDay && (
                  <div className="flex items-center my-4">
                    <span className="text-sm font-euclid-semibold text-gray-600 mr-2">
                      {transaction.groupDate.split(' •')[0]}
                    </span>
                    <span className="text-sm font-euclid-regular text-gray-500">
                      • {transaction.groupDate.split('• ')[1]}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Image
                      src="/icons/transfer_icon_green.png"
                      alt="Transfer"
                      width={24}
                      height={24}
                      className="w-[26px] h-[20px] mr-3"
                    />
                    <div>
                      <div className="text-black text-base text-sm font-euclid-regular">{transaction.iban}</div>
                      <div className="text-gray-500 text-sm font-euclid-regular">{transaction.date}</div>
                    </div>
                  </div>
                  <div className="text-black text-sm font-euclid-semibold">{transaction.amount}</div>
                </div>

                {/* Separator line */}
                <div className="border-b border-gray-200 mt-2"></div>
              </div>
            ))}
          </div>
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

        {/* Transfer Button */}
        <button
          onClick={handleOpenModal}
          className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg touchable-opacity"
        >
          <Image
            src="/icons/transfer_icon_white.png"
            alt="Transfer"
            width={24}
            height={24}
            className="w-[37px] h-[29px]"
          />
        </button>

        {/* Spacer for symmetry */}
        <div className="w-16 h-16"></div>
      </div>

      {/* Transfer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
          <div className="bg-black rounded-t-3xl w-full max-w-md p-6 animate-slide-up pointer-events-auto">
            <div className="mb-6">
              <h3 className="text-white text-xl font-euclid-semibold mb-4">Nume beneficiar</h3>
              <input
                type="text"
                placeholder="Nume si prenume"
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
                className="w-full p-4 rounded-2xl border-0 bg-white text-black placeholder-gray-400 font-euclid-regular"
              />
            </div>

            <div className="mb-6">
              <h3 className="text-white text-xl font-euclid-semibold mb-4">IBAN beneficiar</h3>
              <input
                type="text"
                placeholder="IBAN"
                value={beneficiaryIban}
                onChange={(e) => setBeneficiaryIban(e.target.value)}
                className="w-full p-4 rounded-2xl border-0 bg-white text-black placeholder-gray-400 font-euclid-regular"
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-xl font-euclid-semibold">Cât vrei sa transferi?</h3>
                <span className="text-white text-sm font-euclid-regular">Sold: <span className="font-euclid-bold">265,5</span> Ron</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Suma"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-4 pr-16 rounded-2xl border-0 bg-white text-black placeholder-gray-400 font-euclid-regular"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black font-euclid-semibold">RON</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handleCloseModal}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors touchable-opacity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-black">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={handleTransfer}
                className="flex-1 ml-4 bg-white text-black py-4 rounded-full font-euclid-bold text-lg hover:bg-gray-100 transition-colors touchable-opacity"
              >
                Transfera
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
          <div className="bg-black rounded-t-3xl w-full max-w-md p-8 pointer-events-auto text-center">
            <div className="mb-8">
              <Image
                src="/illustrations/transfer_succedded_illustration.png"
                alt="Transfer Success"
                width={120}
                height={120}
                className="mx-auto mb-6"
              />
              <p className="text-white text-lg font-euclid-regular leading-relaxed">
                Transferul a fost efectuat lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>

            <button
              onClick={handleCloseSuccessModal}
              className="w-full bg-white text-black py-4 rounded-full font-euclid-bold text-lg hover:bg-gray-100 transition-colors touchable-opacity"
            >
              Închide
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 