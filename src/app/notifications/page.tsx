'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { primary } from '../styles/colors';
import ThemeColor from '../components/ThemeColor';
import Header from '../components/Header';

export default function NotificationsPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/home');
  };

  const notifications = [
    {
      icon: '/icons/open_camera_icon.png',
      title: 'Weekendul a fost epic!',
      description: 'Bună dimineața, campion al weekend-ului! 🎉 Dacă weekendul a fost epic (și sticluțele goale îți confirmă), e timpul să transformi <strong>"durerea de cap"</strong> în <strong>"bani în buzunar"</strong>! Ambalajele alea își fac bagajele pentru RVM-urile RetuRO - hai să le trimitem acasă! 🚀',
      iconBg: 'bg-green-500'
    },
    {
      icon: '/icons/open_camera_icon.png',
      title: 'Frigiderul te dă de gol!',
      description: 'Sticlele goale vor la plimbare. Du‑le la RVM și întoarce‑te cu puncte fresh 💸',
      iconBg: 'bg-blue-500'
    },
    {
      icon: '/icons/portofel_icon.png',
      title: 'Sacoșa imploră: „Eliberează‑mă!"',
      description: '10 PET‑uri captive? Scoate‑le la aer și câștigă bonus Bulk +5 🌪️',
      iconBg: 'bg-orange-500'
    },
    {
      icon: '/icons/provocari_icon.png',
      title: 'Luni fără plastic? Challenge accepted!',
      description: 'Scanează primul recipient azi și pornești streak‑ul de 7 zile 🔥',
      iconBg: 'bg-red-500'
    },
    {
      icon: '/icons/receipt_icon.png',
      title: 'PETflix & chill s‑a terminat',
      description: 'Maratonul de weekend a lăsat urme. Transformă recipientele reciclabile în EcoPoints 🚀',
      iconBg: 'bg-purple-500'
    },
    {
      icon: '/icons/wallet_yellow_icon.png',
      title: 'Nu lăsa punctele să bată din aripi',
      description: '1500 EcoPoints = Gold. Îți lipsesc doar 120… țâșnești până la RVM? 🏅',
      iconBg: 'bg-yellow-400'
    },
    {
      icon: '/icons/big_star_icon.png',
      title: 'Felicitari!',
      description: 'Ai ieșit pe <strong>locul 2</strong> în provocarea săptămânii trecute! Ești pe drumul cel bun către recompense și mai mari.',
      iconBg: 'bg-green-500'
    },
    {
      icon: '/icons/progress_bar_icon.png',
      title: 'Grabeste-te!',
      description: 'Mai ai la dispoziție <strong>14 zile</strong> pentru a finaliza provocarea lunară. Ai nevoie de încă <strong>20 bonuri</strong> pentru a câștiga recompensa de 15 RON.',
      iconBg: 'bg-orange-500'
    },
    {
      icon: '/icons/provocari_icon.png',
      title: 'Noua provocare!',
      description: 'A început o nouă provocare! Scanează <strong>100 bonuri</strong> în următoarele 30 de zile și câștiga un <strong>voucher de 25 RON</strong> utilizabil la toți partenerii.',
      iconBg: 'bg-yellow-400'
    },
    {
      icon: '/icons/wallet_icon.png',
      title: 'Premiu disponibil!',
      description: 'Ai câștigat un <strong>voucher de 50 RON</strong>! Folosește-l în următoarele <strong>30 de zile</strong> la oricare dintre partenerii noștri.',
      iconBg: 'bg-purple-500'
    },
    {
      icon: '/icons/user_icon.png',
      title: 'Prieteni noi!',
      description: '<strong>Maria și Alex</strong> au acceptat invitația ta! Vei primi <strong>10 RON bonus</strong> pentru fiecare prieten care scanează primul bon.',
      iconBg: 'bg-blue-500'
    },
    {
      icon: '/icons/badge_icon.png',
      title: 'Locul 1 în provocare!',
      description: 'Ești pe primul loc în provocarea săptămânii! Continuă să colectezi bonuri pentru a păstra poziția și a câștiga premiul mare.',
      iconBg: 'bg-yellow-400'
    },
    {
      icon: '/icons/notificari_icon.png',
      title: 'Voucherul expiră!',
      description: 'Voucherul tău de <strong>25 RON</strong> va expira în <strong>3 zile</strong>. Nu uita să îl folosești la următoarea cumpărătură.',
      iconBg: 'bg-red-500'
    },
    {
      icon: '/icons/star_icon.png',
      title: 'Bonus weekend!',
      description: 'Această sâmbătă și duminică primești <strong>dublu puncte</strong> pentru toate bonurile scanate. Profită de ofertă!',
      iconBg: 'bg-green-500'
    },
    {
      icon: '/icons/donate_icon.png',
      title: 'Donație realizată!',
      description: 'Ai donat cu succes <strong>50 RON</strong> către <strong>Daruiește Aripi</strong>. Mulțumim pentru generozitatea ta!',
      iconBg: 'bg-pink-500'
    },
    {
      icon: '/icons/receipt_icon.png',
      title: 'Bon nou scanat!',
      description: 'Ai scanat un bon de <strong>127 RON</strong> de la Mega Image. Ai primit <strong>12 puncte</strong> pentru acest bon.',
      iconBg: 'bg-green-500'
    },
    {
      icon: '/icons/transfer_icon_green.png',
      title: 'Transfer realizat!',
      description: 'Ai transferat cu succes <strong>100 RON</strong> către <strong>Ana M.</strong> Transferul a fost procesat instant.',
      iconBg: 'bg-green-500'
    },
    {
      icon: '/icons/wallet_statistics_icon.png',
      title: 'Statistici lunare!',
      description: 'În luna aceasta ai scanat <strong>45 bonuri</strong> și ai economisit <strong>230 RON</strong>. Performanță excelentă!',
      iconBg: 'bg-blue-500'
    }
  ];

  return (
    <div className="h-screen flex flex-col relative" style={{ backgroundColor: primary.lightGreen }}>
      <ThemeColor color="#D2ECDE" />

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-40" style={{ backgroundColor: primary.lightGreen }}>
        <Header showTitle={true} title="Notificari" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 pt-26">
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div key={index} className="rounded-4xl p-6 relative overflow-hidden" style={{ backgroundColor: '#B8E6C1' }}>
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${notification.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Image
                    src={notification.icon}
                    alt={notification.title}
                    width={24}
                    height={24}
                    className="w-6 h-6 filter brightness-0 invert"
                  />
                </div>
                <div className="flex-1 pr-6">
                  <h3 className="text-xl font-euclid-bold text-black mb-3">{notification.title}</h3>
                  <p
                    className="text-base font-euclid-regular text-black leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: notification.description.replace(/\n/g, '<br />').replace(/<strong>/g, '<span class="font-euclid-bold">').replace(/<\/strong>/g, '</span>')
                    }}
                  />
                </div>
              </div>
              <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-400 rounded-full"></div>
            </div>
          ))}
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