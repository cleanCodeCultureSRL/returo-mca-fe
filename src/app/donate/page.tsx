'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { primary } from '../styles/colors';
import Header from '../components/Header';
import ThemeColor from '../components/ThemeColor';

interface NGO {
  id: number;
  name: string;
  logo: string;
  logoImage?: string;
  color: string;
}

export default function DonatePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock account balance
  const accountBalance = 265.5;

  const handleBack = () => {
    router.push('/wallet');
  };

  const handleViewAll = () => {
    console.log('View all NGOs');
  };

  const handleNGOClick = (ngo: NGO) => {
    setSelectedNGO(ngo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNGO(null);
    setDonationAmount('');
  };

  const handleDonate = () => {
    if (donationAmount && selectedNGO) {
      console.log(`Donating ${donationAmount} RON to ${selectedNGO.name}`);
      // Add donation logic here
      handleCloseModal();
      setShowConfirmation(true);
    }
  };

  // Romanian NGOs data
  const romanianNGOs: NGO[] = [
    { id: 1, name: 'Dăruiește Aripi', logo: 'DA', logoImage: '/logos/daruieste-aripi-logo.svg', color: 'from-blue-500 to-blue-700' },
    { id: 2, name: 'Asociația SPRO', logo: 'SP', logoImage: '/logos/asociatia-spro-logo.png', color: 'from-green-500 to-green-700' },
    { id: 3, name: 'AMURTEL România', logo: 'AM', color: 'from-purple-500 to-purple-700' },
    { id: 4, name: 'Casa Speranței', logo: 'CS', color: 'from-red-500 to-red-700' },
    { id: 5, name: 'Salvați Copiii', logo: 'SC', color: 'from-orange-500 to-orange-700' },
    { id: 6, name: 'Habitat România', logo: 'HR', color: 'from-teal-500 to-teal-700' },
    { id: 7, name: 'World Vision', logo: 'WV', color: 'from-indigo-500 to-indigo-700' },
    { id: 8, name: 'Fundația Vodafone', logo: 'FV', color: 'from-pink-500 to-pink-700' },
    { id: 9, name: 'Federația Hope', logo: 'FH', color: 'from-yellow-500 to-yellow-700' },
    { id: 10, name: 'Asociația MaiMultVerde', logo: 'MV', color: 'from-lime-500 to-lime-700' },
    { id: 11, name: 'Fundația Comunitară', logo: 'FC', color: 'from-cyan-500 to-cyan-700' },
    { id: 12, name: 'Asociația Noi Orizonturi', logo: 'NO', color: 'from-emerald-500 to-emerald-700' },
  ];

  // Get 6 featured NGOs
  const featuredNGOs = romanianNGOs.slice(0, 6);

  // Mock data for donation reports with Romanian NGOs and dates
  const donationReports = [
    { id: 1, ngo: romanianNGOs[0], date: '05 Iun', amount: '200 RON', dateGroup: '05 Iun • Vineri' },
    { id: 2, ngo: romanianNGOs[1], date: '05 Iun', amount: '150 RON', dateGroup: '05 Iun • Vineri' },
    { id: 3, ngo: romanianNGOs[2], date: '04 Iun', amount: '300 RON', dateGroup: '04 Iun • Joi' },
    { id: 4, ngo: romanianNGOs[3], date: '04 Iun', amount: '100 RON', dateGroup: '04 Iun • Joi' },
    { id: 5, ngo: romanianNGOs[4], date: '04 Iun', amount: '250 RON', dateGroup: '04 Iun • Joi' },
  ];

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: primary.lightGreen }}>
      <ThemeColor color="#D2ECDE" />

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: primary.lightGreen }}>
        <Header showTitle={true} title="Donează" />

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-full border-3 border-black p-4 flex items-center">
            <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center mr-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cauta ONG..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-gray-500 text-lg font-euclid-regular outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-4 space-y-6" style={{ paddingTop: '160px' }}>

        {/* ONG-uri pentru tine Section */}
        <div>
          {/* <h2 className="text-black text-2xl font-euclid-bold mb-4">ONG-uri pentru tine</h2> */}
          <div className="grid grid-cols-3 gap-2 mt-10" >
            {featuredNGOs.map((ngo) => (
              <button
                key={ngo.id}
                onClick={() => handleNGOClick(ngo)}
                className="bg-transparent rounded-2xl p-4 aspect-square flex flex-col items-center justify-center space-y-2 touchable-opacity"
              >
                {/* NGO Logo - Circular with gradient */}
                <div className={`w-16 h-16 rounded-full ${ngo.logoImage ? 'bg-white border-2 border-black' : `bg-gradient-to-br ${ngo.color}`} flex items-center justify-center relative overflow-hidden`}>
                  {ngo.logoImage ? (
                    <img
                      src={ngo.logoImage}
                      alt={ngo.name}
                      className="w-12 h-12 object-contain z-10"
                    />
                  ) : (
                    <>
                      {/* Logo Text */}
                      <span className="text-white text-lg font-euclid-bold z-10">{ngo.logo}</span>
                      {/* Radial pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="w-full h-full bg-white rounded-full transform scale-50"></div>
                      </div>
                      {/* Radiating lines */}
                      <div className="absolute inset-0">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-0.5 h-4 bg-white opacity-30 transform-gpu"
                            style={{
                              top: '50%',
                              left: '50%',
                              transformOrigin: '0 0',
                              transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-24px)`,
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <span className="text-black text-sm font-euclid-bold text-center">{ngo.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* All NGOs Section */}
        <div className="bg-white rounded-full border-3 border-black overflow-hidden max-h-[60px]">
          <div className="flex items-center">
            <div className="flex items-center space-x-3 flex-1 pl-4">
              {/* Overlapping circular logos */}
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-blue-600 border-2 border-white flex items-center justify-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-30">
                      <div className="w-full h-full bg-white rounded-full transform scale-50"></div>
                    </div>
                    <div className="absolute inset-0">
                      {[...Array(8)].map((_, j) => (
                        <div
                          key={j}
                          className="absolute w-0.5 h-2 bg-white opacity-60 transform-gpu"
                          style={{
                            top: '50%',
                            left: '50%',
                            transformOrigin: '0 0',
                            transform: `translate(-50%, -50%) rotate(${j * 45}deg) translateY(-14px)`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <span className="text-black text-sm font-euclid-medium">+ 23k ONG-uri</span>
            </div>
            <button
              onClick={handleViewAll}
              className="bg-black text-white px-6 py-3 text-sm font-euclid-bold touchable-opacity h-full rounded-r-full"
            >
              Vezi toate
            </button>
          </div>
        </div>

        {/* Donation Reports Section */}
        <div className="bg-white rounded-2xl p-4 border-2 border-black">
          <h2 className="text-black text-lg font-euclid-bold mb-4">Rapoarte donații</h2>

          <div className="space-y-3">
            {donationReports.map((donation, index) => (
              <div key={donation.id}>
                {(index === 0 || donation.dateGroup !== donationReports[index - 1].dateGroup) && (
                  <div className="flex items-center my-4">
                    <span className="text-sm font-euclid-semibold text-gray-600 mr-2">
                      {donation.dateGroup.split(' •')[0]}
                    </span>
                    <span className="text-sm font-euclid-regular text-gray-500">
                      • {donation.dateGroup.split('• ')[1]}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between ">
                  <div className="flex items-center">
                    {/* NGO Logo */}
                    <div className={`w-[30px] h-[30px] mr-3 rounded-full ${donation.ngo.logoImage ? 'bg-white border-2 border-black' : `bg-gradient-to-br ${donation.ngo.color}`} flex items-center justify-center relative overflow-hidden`}>
                      {donation.ngo.logoImage ? (
                        <img
                          src={donation.ngo.logoImage}
                          alt={donation.ngo.name}
                          className="w-4 h-4 object-contain z-10"
                        />
                      ) : (
                        <>
                          <span className="text-white text-xs font-euclid-bold z-10">{donation.ngo.logo}</span>
                          <div className="absolute inset-0 opacity-20">
                            <div className="w-full h-full bg-white rounded-full transform scale-50"></div>
                          </div>
                          <div className="absolute inset-0">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-0.5 h-1 bg-white opacity-30 transform-gpu"
                                style={{
                                  top: '50%',
                                  left: '50%',
                                  transformOrigin: '0 0',
                                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-8px)`,
                                }}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* NGO Details */}
                    <div>
                      <div className="text-black text-base text-sm font-euclid-regular">{donation.ngo.name}</div>
                      <div className="text-gray-500 text-sm font-euclid-regular">{donation.date}</div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-black text-sm font-euclid-semibold">{donation.amount}</div>
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
          className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center touchable-opacity shadow-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Spacer for symmetry */}
        <div className="w-16 h-16"></div>
      </div>

      {/* Donation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
          {/* Invisible backdrop for click outside to close */}
          <div
            className="absolute inset-0 pointer-events-auto"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-black rounded-t-3xl p-6 animate-slide-up pointer-events-auto">
            {/* Selected NGO Info */}
            {selectedNGO && (
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-full ${selectedNGO.logoImage ? 'bg-white border-2 border-black' : `bg-gradient-to-br ${selectedNGO.color}`} flex items-center justify-center relative overflow-hidden`}>
                  {selectedNGO.logoImage ? (
                    <img
                      src={selectedNGO.logoImage}
                      alt={selectedNGO.name}
                      className="w-12 h-12 object-contain z-10"
                    />
                  ) : (
                    <>
                      <span className="text-white text-lg font-euclid-bold z-10">{selectedNGO.logo}</span>
                      <div className="absolute inset-0 opacity-20">
                        <div className="w-full h-full bg-white rounded-full transform scale-50"></div>
                      </div>
                      <div className="absolute inset-0">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-0.5 h-3 bg-white opacity-30 transform-gpu"
                            style={{
                              top: '50%',
                              left: '50%',
                              transformOrigin: '0 0',
                              transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-20px)`,
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <h3 className="text-white text-xl font-euclid-bold">{selectedNGO.name}</h3>
                  <p className="text-gray-300 text-sm font-euclid-regular">Organizație neguvernamentală</p>
                </div>
              </div>
            )}

            {/* Donation Amount Input */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-xl font-euclid-semibold">Cât vrei să donezi?</h3>
                <span className="text-white text-sm font-euclid-regular">Sold: <span className="font-euclid-bold">{accountBalance.toLocaleString()}</span> Ron</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Suma"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full p-4 pr-16 rounded-2xl border-0 bg-white text-black placeholder-gray-400 font-euclid-regular"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black font-euclid-semibold">RON</span>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {[50, 100, 200, 500].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setDonationAmount(amount.toString())}
                  className="bg-gray-800 text-white rounded-xl py-3 px-4 text-sm font-euclid-semibold touchable-opacity border border-gray-600"
                >
                  {amount} RON
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleCloseModal}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors touchable-opacity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-black">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={handleDonate}
                disabled={!donationAmount || parseFloat(donationAmount) <= 0 || parseFloat(donationAmount) > accountBalance}
                className="flex-1 ml-4 bg-white text-black py-4 rounded-full font-euclid-bold text-lg hover:bg-gray-100 transition-colors touchable-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Donează
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Donation Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
          {/* Invisible backdrop for click outside to close */}
          <div
            className="absolute inset-0 pointer-events-auto"
            onClick={() => setShowConfirmation(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-black rounded-t-3xl p-6 animate-slide-up pointer-events-auto">
            <div className="text-center">
              {/* Success Illustration */}
              <div className="mb-6">
                <img
                  src="/illustrations/transfer_succedded_illustration.png"
                  alt="Donation Success"
                  className="w-32 h-32 mx-auto object-contain"
                />
              </div>

              {/* Success Message */}
              <div className="mb-6">
                <h2 className="text-white text-xl font-euclid-bold mb-3">
                  Donația a fost efectuată
                </h2>
                <p className="text-white text-sm font-euclid-regular">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full bg-white text-black py-4 rounded-full font-euclid-bold text-lg hover:bg-gray-100 transition-colors touchable-opacity"
              >
                Închide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 