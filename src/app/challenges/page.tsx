'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { primary, text, yellow } from '../styles/colors';
import ThemeColor from '../components/ThemeColor';
import Header from '../components/Header';

export default function ChallengesPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/home');
  };

  // Leaderboard data
  const leaderboard = [
    { rank: 1, name: 'Maria M.', score: 600, avatar: '/illustrations/persona_illustration.png' },
    { rank: 2, name: 'Andrei C.', score: 444, avatar: '/illustrations/persona_illustration.png' },
    { rank: 3, name: 'Livia B.', score: 380, avatar: '/illustrations/persona_illustration.png' },
    { rank: 4, name: 'Alin U.', score: 240, avatar: '/illustrations/persona_illustration.png' },
    { rank: 5, name: 'Matei D.', score: 220, avatar: '/illustrations/persona_illustration.png' },
    { rank: 6, name: 'Bogdan S.', score: 210, avatar: '/illustrations/persona_illustration.png' },
  ];

  return (
    <div className="min-h-screen relative flex flex-col" style={{ backgroundColor: primary.lightGreen }}>
      <ThemeColor color="#D2ECDE" />

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Header showTitle={true} title="Provocari" />
      </div>

      {/* Fixed Top Card */}
      <div className="fixed top-30 left-0 right-0 z-30 px-4" style={{ backgroundColor: primary.lightGreen }}>
        <div className="bg-black rounded-3xl relative overflow-hidden">
          {/* Green Card - Top Section */}
          <div className="bg-primary-green rounded-3xl p-4 relative overflow-hidden mb-2 border-3 border-black">
            {/* Star Icons */}
            <div className="absolute top-2 right-4 w-[50px] h-[50px] z-20">
              <Image
                src="/icons/big_star_icon.png"
                alt="Star icon"
                width={50}
                height={50}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute top-6 right-16 w-[35px] h-[35px] z-20">
              <Image
                src="/icons/big_star_icon.png"
                alt="Star icon"
                width={35}
                height={35}
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className="text-white text-xl font-euclid-semibold mb-6">Recompensa lunară</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white text-base font-euclid-regular mb-1">Recompensa:</p>
                <p className="text-white text-2xl font-euclid-bold">15 RON</p>
              </div>
              <div>
                <p className="text-white text-base font-euclid-regular mb-1">Progres:</p>
                <p className="text-white text-2xl font-euclid-bold">80/100</p>
              </div>
            </div>
          </div>

          {/* Progress Bar - Bottom Section */}
          <div className="px-4 pb-2">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-euclid-regular" style={{ color: text.subtitle }}>Ai reciclat 80 din 100</span>
              <span className="text-sm font-euclid-semibold" style={{ color: yellow }}>14 zile</span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div className="h-3 rounded-full" style={{ backgroundColor: yellow, width: '80%' }}></div>
              </div>
              <div className="absolute -top-8 left-[80%] transform -translate-x-1/2">
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
      </div>

      {/* Scrollable Leaderboard Section */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 mt-90" >
        {/* Leaderboard Section */}
        <div className="bg-white rounded-3xl border-3 border-black p-6">
          <div className="text-center mb-6">
            <h3 className="text-black text-xl font-euclid-semibold mb-2">
              Felicitari! Ai iesit pe locul 2 saptamana trecuta.
            </h3>

            {/* Golden League Badge */}
            <div className="inline-flex bg-black rounded-4xl h-[50px] items-center">
              <div className="w-[51px] h-[51px] bg-[#FFDC04] rounded-full flex items-center justify-center border-2 border-[#FFDC04]  ">
                <Image
                  src="/icons/badge_icon.png"
                  alt="Badge"
                  width={24}
                  height={24}
                  className="w-[40px] h-[40px]"
                />
              </div>
              <div className="flex-1 py-3 px-2">
                <p className="text-base text-sm font-euclid-bold" style={{ color: "#FFDC04" }}>Golden league</p>
              </div>

            </div>
          </div>

          {/* Leaderboard List */}
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <div key={index} className={`flex items-center justify-between ${index < leaderboard.length - 1 ? 'border-b border-gray-200 pb-2' : ''}`}>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Badge for top 3 */}
                    {user.rank <= 3 && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6  rounded-full flex items-center justify-center">
                        <Image
                          src="/icons/user_badge.png"
                          alt="Badge"
                          width={16}
                          height={16}
                          className="w-[18px] h-[24px]"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-black text-lg font-euclid-bold">
                      {user.rank}. {user.name}
                    </span>
                  </div>
                </div>
                <div className="text-black text-xl font-euclid-bold">
                  {user.score}
                </div>
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
    </div>
  );
} 