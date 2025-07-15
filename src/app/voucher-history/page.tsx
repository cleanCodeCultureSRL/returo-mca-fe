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
  status: 'disponibile' | 'utilizate' | 'expirate';
}

export default function VoucherHistoryPage() {
  const router = useRouter();
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'disponibile' | 'utilizate' | 'expirate'>('disponibile');
  const [selectedRetailer, setSelectedRetailer] = useState<string | null>(null);
  const [showRetailerModal, setShowRetailerModal] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryIban, setBeneficiaryIban] = useState('');
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedVouchers, setSelectedVouchers] = useState<string[]>([]);
  const [isBulkTransferModalOpen, setIsBulkTransferModalOpen] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleVoucherSelect = (voucher: Voucher) => {
    if (isBulkMode) {
      // Toggle voucher selection in bulk mode
      setSelectedVouchers(prev =>
        prev.includes(voucher.receiptNumber)
          ? prev.filter(id => id !== voucher.receiptNumber)
          : [...prev, voucher.receiptNumber]
      );
    } else {
      // Normal single voucher selection
      setSelectedVoucher(voucher);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVoucher(null);
  };

  const handleCashOut = () => {
    // Open transfer modal for single cash out
    setShowModal(false);
    setIsTransferModalOpen(true);
  };

  const handleBulkCashOut = () => {
    // Open bulk transfer modal
    setIsBulkTransferModalOpen(true);
  };

  const handleToggleBulkMode = () => {
    setIsBulkMode(!isBulkMode);
    setSelectedVouchers([]);
  };

  const handleCloseTransferModal = () => {
    setIsTransferModalOpen(false);
    setBeneficiaryName('');
    setBeneficiaryIban('');
  };

  const handleCloseBulkTransferModal = () => {
    setIsBulkTransferModalOpen(false);
    setBeneficiaryName('');
    setBeneficiaryIban('');
  };

  const handleTransfer = () => {
    // Handle single transfer logic here
    console.log('Cash out transfer:', {
      voucher: selectedVoucher,
      beneficiaryName,
      beneficiaryIban,
      amount: selectedVoucher?.amount
    });
    setIsTransferModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleBulkTransfer = () => {
    // Handle bulk transfer logic here
    const selectedVoucherData = vouchers.filter(v => selectedVouchers.includes(v.receiptNumber));
    console.log('Bulk cash out transfer:', {
      vouchers: selectedVoucherData,
      beneficiaryName,
      beneficiaryIban,
      totalAmount: calculateTotalAmount()
    });
    setIsBulkTransferModalOpen(false);
    setIsSuccessModalOpen(true);
    setIsBulkMode(false);
    setSelectedVouchers([]);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setSelectedVoucher(null);
    // Reset form fields
    setBeneficiaryName('');
    setBeneficiaryIban('');
  };

  const calculateTotalAmount = () => {
    return vouchers
      .filter(v => selectedVouchers.includes(v.receiptNumber))
      .reduce((total, voucher) => {
        const amount = parseFloat(voucher.amount.replace(' RON', '').replace(',', '.'));
        return total + amount;
      }, 0);
  };

  const formatAmount = (amount: number) => {
    return amount.toFixed(1).replace('.', ',') + ' RON';
  };

  const vouchers = [
    {
      receiptNumber: '00044728',
      date: '17/06/2025 13:47:02',
      amount: '47,5 RON',
      retailer: 'Kaufland',
      status: 'disponibile' as const
    },
    {
      receiptNumber: '00098432',
      date: '16/06/2025 10:32:15',
      amount: '23,5 RON',
      retailer: 'Carrefour',
      status: 'disponibile' as const
    },
    {
      receiptNumber: '00156789',
      date: '15/06/2025 16:18:43',
      amount: '156,5 RON',
      retailer: 'Auchan',
      status: 'utilizate' as const
    },
    {
      receiptNumber: '00067291',
      date: '14/06/2025 09:15:28',
      amount: '31 RON',
      retailer: 'Mega Image',
      status: 'expirate' as const
    },
    {
      receiptNumber: '00034567',
      date: '13/06/2025 14:22:10',
      amount: '18,5 RON',
      retailer: 'Profi',
      status: 'disponibile' as const
    },
    {
      receiptNumber: '00044729',
      date: '17/06/2025 13:47:02',
      amount: '47,5 RON',
      retailer: 'Kaufland',
      status: 'utilizate' as const
    },
    {
      receiptNumber: '00098433',
      date: '16/06/2025 10:32:15',
      amount: '23,5 RON',
      retailer: 'Carrefour',
      status: 'expirate' as const
    },
    {
      receiptNumber: '00156790',
      date: '15/06/2025 16:18:43',
      amount: '156,5 RON',
      retailer: 'Auchan',
      status: 'disponibile' as const
    },
    {
      receiptNumber: '00067292',
      date: '14/06/2025 09:15:28',
      amount: '31 RON',
      retailer: 'Mega Image',
      status: 'utilizate' as const
    },
    {
      receiptNumber: '00034568',
      date: '13/06/2025 14:22:10',
      amount: '18,5 RON',
      retailer: 'Profi',
      status: 'expirate' as const
    },
    {
      receiptNumber: '00078345',
      date: '12/06/2025 11:45:33',
      amount: '89,5 RON',
      retailer: 'Lidl',
      status: 'disponibile' as const
    },
    {
      receiptNumber: '00123456',
      date: '11/06/2025 16:22:18',
      amount: '126 RON',
      retailer: 'Metro',
      status: 'disponibile' as const
    },
    {
      receiptNumber: '00245678',
      date: '10/06/2025 08:15:45',
      amount: '67,5 RON',
      retailer: 'Selgros',
      status: 'utilizate' as const
    },
    {
      receiptNumber: '00567890',
      date: '09/06/2025 19:30:12',
      amount: '42,5 RON',
      retailer: 'Cora',
      status: 'disponibile' as const
    },
    {
      receiptNumber: '00789012',
      date: '08/06/2025 12:08:27',
      amount: '16 RON',
      retailer: 'Penny Market',
      status: 'expirate' as const
    },
    {
      receiptNumber: '00345123',
      date: '07/06/2025 14:55:41',
      amount: '203,5 RON',
      retailer: 'Auchan',
      status: 'utilizate' as const
    },
    {
      receiptNumber: '00456789',
      date: '06/06/2025 10:12:09',
      amount: '78,5 RON',
      retailer: 'Kaufland',
      status: 'disponibile' as const
    },
    {
      receiptNumber: '00678901',
      date: '05/06/2025 17:43:56',
      amount: '34,5 RON',
      retailer: 'Profi',
      status: 'expirate' as const
    },
    {
      receiptNumber: '00890123',
      date: '04/06/2025 13:27:33',
      amount: '92 RON',
      retailer: 'Carrefour',
      status: 'utilizate' as const
    },
    {
      receiptNumber: '00901234',
      date: '03/06/2025 09:38:14',
      amount: '56,5 RON',
      retailer: 'Mega Image',
      status: 'disponibile' as const
    },
    {
      receiptNumber: '00234567',
      date: '02/06/2025 15:19:52',
      amount: '129 RON',
      retailer: 'Lidl',
      status: 'expirate' as const
    },
    {
      receiptNumber: '00112233',
      date: '01/06/2025 11:06:38',
      amount: '45,5 RON',
      retailer: 'Metro',
      status: 'disponibile' as const
    },
    {
      receiptNumber: '00334455',
      date: '31/05/2025 18:24:15',
      amount: '76,5 RON',
      retailer: 'Selgros',
      status: 'utilizate' as const
    },
    {
      receiptNumber: '00556677',
      date: '30/05/2025 12:41:29',
      amount: '30 RON',
      retailer: 'Cora',
      status: 'disponibile' as const
    },
    {
      receiptNumber: '00778899',
      date: '29/05/2025 16:58:07',
      amount: '134,5 RON',
      retailer: 'Auchan',
      status: 'expirate' as const
    },
    {
      receiptNumber: '00998877',
      date: '28/05/2025 14:33:44',
      amount: '87,5 RON',
      retailer: 'Penny Market',
      status: 'utilizate' as const
    },
    {
      receiptNumber: '00665544',
      date: '27/05/2025 10:17:21',
      amount: '53 RON',
      retailer: 'Kaufland',
      status: 'disponibile' as const
    },
    {
      receiptNumber: '00443322',
      date: '26/05/2025 13:49:36',
      amount: '19,5 RON',
      retailer: 'Profi',
      status: 'expirate' as const
    },
    {
      receiptNumber: '00221100',
      date: '25/05/2025 08:25:53',
      amount: '166 RON',
      retailer: 'Metro',
      status: 'utilizate' as const
    },
    {
      receiptNumber: '00147258',
      date: '24/05/2025 19:02:18',
      amount: '74 RON',
      retailer: 'Carrefour',
      status: 'disponibile' as const
    },
  ];

  const filteredVouchers = vouchers.filter(voucher => {
    const matchesStatus = voucher.status === selectedFilter;
    const matchesRetailer = selectedRetailer ? voucher.retailer === selectedRetailer : true;
    return matchesStatus && matchesRetailer;
  });

  const handleFilterChange = (filter: 'disponibile' | 'utilizate' | 'expirate') => {
    setSelectedFilter(filter);
    // Exit bulk mode when switching tabs
    setIsBulkMode(false);
    setSelectedVouchers([]);
  };

  const retailers = [
    'Auchan', 'Metro', 'Selgros', 'Carrefour', 'Lidl', 'Mega Image', 'Kaufland',
    'Profi', 'Cora', 'Penny Market', 'La Cocos', 'Dedeman', 'Altex', 'eMAG'
  ];

  const handleRetailerSelect = (retailer: string) => {
    setSelectedRetailer(retailer);
    setShowRetailerModal(false);
  };

  const handleClearRetailerFilter = () => {
    setSelectedRetailer(null);
    setShowRetailerModal(false);
  };

  return (
    <div className="h-screen flex flex-col relative" style={{ backgroundColor: primary.lightGreen }}>
      <ThemeColor color="#D2ECDE" />

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-40" style={{ backgroundColor: primary.lightGreen }}>
        <Header showTitle={true} title="Arhivă vouchere" />
      </div>

      {/* Fixed Filter Tabs */}
      <div className="fixed top-22 left-0 right-0 z-30 flex space-x-2 pt-4 px-4 pb-4" style={{ backgroundColor: primary.lightGreen }}>
        <button
          onClick={() => handleFilterChange('disponibile')}
          className={`text-black px-2 py-3 rounded-2xl text-base font-euclid-semibold touchable-opacity flex-1 ${selectedFilter === 'disponibile' ? '' : 'bg-white'
            }`}
          style={{ backgroundColor: selectedFilter === 'disponibile' ? primary.green : undefined }}
        >
          Disponibile
        </button>
        <button
          onClick={() => handleFilterChange('utilizate')}
          className={`text-black px-2 py-3 rounded-2xl text-base font-euclid-semibold  touchable-opacity flex-1 ${selectedFilter === 'utilizate' ? '' : 'bg-white'
            }`}
          style={{ backgroundColor: selectedFilter === 'utilizate' ? primary.green : undefined }}
        >
          Utilizate
        </button>
        <button
          onClick={() => handleFilterChange('expirate')}
          className={`text-black px-2 py-3 rounded-2xl text-base font-euclid-semibold touchable-opacity flex-1 ${selectedFilter === 'expirate' ? '' : 'bg-white'
            }`}
          style={{ backgroundColor: selectedFilter === 'expirate' ? primary.green : undefined }}
        >
          Expirate
        </button>
        <button
          onClick={() => setShowRetailerModal(true)}
          className={`text-black px-3 py-3 rounded-2xl text-base font-euclid-semibold touchable-opacity ${selectedRetailer ? '' : 'bg-white'
            }`}
          style={{ backgroundColor: selectedRetailer ? primary.green : undefined }}
        >
          <Image
            src="/icons/filter_icon.png"
            alt="Filter"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </button>
      </div>

      {/* Cash out button - only visible on disponibile tab */}
      {selectedFilter === 'disponibile' && (
        <div className="fixed top-[168px] left-0 right-0 z-30 px-4 " style={{ backgroundColor: primary.lightGreen }}>
          <button
            onClick={handleToggleBulkMode}
            className={`w-full text-black py-3 rounded-2xl text-base font-euclid-semibold touchable-opacity ${isBulkMode ? 'bg-yellow-400' : 'bg-white'}`}
          >
            {isBulkMode ? 'Anulează' : 'Cash out'}
          </button>
        </div>
      )}

      {/* Scrollable Voucher History */}
      <div className={`flex-1 overflow-y-auto px-4 ${isBulkMode ? 'pb-55' : 'pb-24'} ${selectedFilter === 'disponibile' ? 'pt-56' : 'pt-44'}`}>
        <div className="space-y-4">
          {filteredVouchers.map((voucher, index) => (
            <div key={index} className="relative">
              {/* Checkbox for bulk mode */}
              {isBulkMode && selectedFilter === 'disponibile' && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedVouchers.includes(voucher.receiptNumber)}
                      onChange={() => handleVoucherSelect(voucher)}
                      className="sr-only"
                    />
                    <div
                      onClick={() => handleVoucherSelect(voucher)}
                      className={`w-6 h-6 rounded-lg border-2 border-black flex items-center justify-center cursor-pointer transition-colors ${selectedVouchers.includes(voucher.receiptNumber)
                        ? 'bg-black'
                        : 'bg-white'
                        }`}
                    >
                      {selectedVouchers.includes(voucher.receiptNumber) && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div onClick={() => handleVoucherSelect(voucher)} className="cursor-pointer">
                <ReceiptCard
                  receiptNumber={voucher.receiptNumber}
                  date={voucher.date}
                  amount={voucher.amount}
                  retailer={voucher.retailer}
                  status={voucher.status}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bulk Cash Out Button */}
      {isBulkMode && selectedVouchers.length > 0 && (
        <div className="fixed bottom-32 left-4 right-4 z-40 px-8">
          <button
            onClick={handleBulkCashOut}
            className="w-full bg-black text-white py-4 rounded-4xl text-lg font-bold hover:bg-gray-800 transition-colors shadow-lg touchable-opacity"
          >
            Cash out {selectedVouchers.length} {selectedVouchers.length === 1 ? 'voucher' : 'vouchere'} în valoare de {formatAmount(calculateTotalAmount())}
          </button>
        </div>
      )}

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

              {/* Voucher Status */}
              <div className="text-center mt-4">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-euclid-semibold ${selectedVoucher.status === 'disponibile' ? 'bg-green-100 text-green-800' :
                  selectedVoucher.status === 'utilizate' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                  {selectedVoucher.status === 'disponibile' ? 'Disponibil' :
                    selectedVoucher.status === 'utilizate' ? 'Utilizat' :
                      'Expirat'}
                </div>
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
              {selectedVoucher.status === 'disponibile' && (
                <button
                  onClick={handleCashOut}
                  className="flex-1 bg-black text-white py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-colors touchable-opacity"
                >
                  Cash out
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Retailer Filter Modal */}
      {showRetailerModal && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-end justify-center z-50"
          onClick={() => setShowRetailerModal(false)}
        >
          <div
            className="bg-white rounded-t-4xl w-full mb-0 animate-slide-up shadow-2xl border-3 border-black flex flex-col"
            style={{ height: '60vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-black">Selectează retailer</h2>
                <button
                  onClick={() => setShowRetailerModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {selectedRetailer && (
                <button
                  onClick={handleClearRetailerFilter}
                  className="w-full bg-red-500 text-white py-3 rounded-2xl text-base font-euclid-semibold touchable-opacity"
                >
                  Șterge filtru retailer
                </button>
              )}
            </div>

            {/* Scrollable Retailer List */}
            <div className="flex-1 overflow-y-auto p-6 pt-4">
              <div className="space-y-2">
                {retailers.map((retailer) => (
                  <button
                    key={retailer}
                    onClick={() => handleRetailerSelect(retailer)}
                    className={`w-full text-left py-3 px-4 rounded-2xl text-base font-euclid-semibold touchable-opacity ${selectedRetailer === retailer ? 'bg-green-500 text-white' : 'bg-gray-100 text-black hover:bg-gray-200'
                      }`}
                  >
                    {retailer}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {isTransferModalOpen && selectedVoucher && (
        <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
          <div className="bg-black rounded-t-3xl w-full max-w-md p-6 animate-slide-up pointer-events-auto">
            {/* Header - matches voucher modal header spacing */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/icons/transfer_icon_white.png"
                    alt="Transfer"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span className="text-lg font-bold text-white">Cash out voucher</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                    src="/icons/wallet_icon.png"
                    alt="Wallet"
                    width={16}
                    height={16}
                    className="w-4 h-4 filter brightness-0 invert"
                  />
                  <span className="text-lg font-bold text-white">{selectedVoucher.retailer}</span>
                </div>
              </div>

              {/* Amount Display - matches voucher amount section */}
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{selectedVoucher.amount}</div>
                <div className="text-sm text-gray-300 mt-1">Suma pentru transfer</div>
              </div>
            </div>

            {/* Form Fields Section - matches barcode section height */}
            <div className="mb-8">
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

              {/* Visual element to match barcode space */}
              <div className="flex justify-center">
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Image
                      src="/icons/transfer_icon_white.png"
                      alt="Transfer"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <span className="text-white text-lg font-euclid-semibold">Transfer bancar</span>
                  </div>
                  <div className="text-center text-sm text-gray-300">
                    Transferul va fi procesat instant
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - matches voucher modal buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCloseTransferModal}
                className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg touchable-opacity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={handleTransfer}
                className="flex-1 bg-white text-black py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors touchable-opacity"
              >
                Cash out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Transfer Modal */}
      {isBulkTransferModalOpen && (
        <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
          <div className="bg-black rounded-t-3xl w-full max-w-md p-6 animate-slide-up pointer-events-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/icons/transfer_icon_white.png"
                    alt="Transfer"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span className="text-lg font-bold text-white">Cash out vouchere</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Image
                    src="/icons/wallet_icon.png"
                    alt="Wallet"
                    width={16}
                    height={16}
                    className="w-4 h-4 filter brightness-0 invert"
                  />
                  <span className="text-lg font-bold text-white">{selectedVouchers.length} vouchere</span>
                </div>
              </div>

              {/* Amount Display */}
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{formatAmount(calculateTotalAmount())}</div>
                <div className="text-sm text-gray-300 mt-1">Suma totală pentru transfer</div>
              </div>
            </div>

            {/* Form Fields Section */}
            <div className="mb-8">
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

              {/* Visual element */}
              <div className="flex justify-center">
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Image
                      src="/icons/transfer_icon_white.png"
                      alt="Transfer"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <span className="text-white text-lg font-euclid-semibold">Transfer bancar</span>
                  </div>
                  <div className="text-center text-sm text-gray-300">
                    Transferul va fi procesat instant
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCloseBulkTransferModal}
                className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg touchable-opacity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={handleBulkTransfer}
                className="flex-1 bg-white text-black py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors touchable-opacity"
              >
                Cash out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && selectedVoucher && (
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
                Cash out pentru {selectedVoucher.amount} a fost efectuat cu succes
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