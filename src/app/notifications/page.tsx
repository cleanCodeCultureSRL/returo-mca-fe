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
      icon: 'star',
      title: 'Felicitari!',
      description: 'Ai ieșit pe locul 2 săptămâna trecută.\nLorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet.',
      iconBg: 'bg-green-500'
    },
    {
      icon: 'clock',
      title: 'Grabeste-te!',
      description: 'Mai ai la dispoziție <strong>14 zile</strong> pentru a finaliza provocarea lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet.',
      iconBg: 'bg-green-500'
    },
    {
      icon: 'barcode',
      title: 'Noua provocare!',
      description: 'A început lorem ipsum dolor sit amet, consectetur adipiscing elit <strong>strange 1 500 peturi</strong> si câștiga un <strong>voucher 10%</strong> utilizabil la toți partenerii.',
      iconBg: 'bg-yellow-400'
    },
    {
      icon: 'gift',
      title: 'Premiu disponibil!',
      description: 'Ai câștigat un <strong>voucher de 50 RON</strong>! Folosește-l în următoarele <strong>30 de zile</strong> la oricare dintre partenerii noștri.',
      iconBg: 'bg-purple-500'
    },
    {
      icon: 'users',
      title: 'Prieteni noi!',
      description: '<strong>Maria și Alex</strong> au acceptat invitația ta! Vei primi <strong>10 RON bonus</strong> pentru fiecare prieten care scanează primul bon.',
      iconBg: 'bg-blue-500'
    },
    {
      icon: 'trophy',
      title: 'Locul 1 în provocare!',
      description: 'Ești pe primul loc în provocarea săptămânii! Continuă să colectezi bonuri pentru a păstra poziția.',
      iconBg: 'bg-gold-500'
    },
    {
      icon: 'warning',
      title: 'Voucherul expiră!',
      description: 'Voucherul tău de 25 RON va expira în 3 zile. Nu uita să îl folosești la următoarea cumpărătură.',
      iconBg: 'bg-red-500'
    },
    {
      icon: 'star',
      title: 'Bonus weekend!',
      description: 'Această sâmbătă și duminică primești dublu puncte pentru toate bonurile scanate. Profită de ofertă!',
      iconBg: 'bg-green-500'
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
      <div className="flex-1 overflow-y-auto px-4 pb-24 pt-30">
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div key={index} className="rounded-4xl p-6 relative overflow-hidden" style={{ backgroundColor: '#B8E6C1' }}>
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${notification.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                  {notification.icon === 'star' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  )}
                  {notification.icon === 'clock' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                  )}
                  {notification.icon === 'barcode' && (
                    <Image
                      src="/barcode.png"
                      alt="Barcode"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  )}
                  {notification.icon === 'gift' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <polyline points="20,12 20,22 4,22 4,12" />
                      <rect x="2" y="7" width="20" height="5" />
                      <line x1="12" y1="22" x2="12" y2="7" />
                      <path d="m5,7 7,-5 7,5" />
                    </svg>
                  )}
                  {notification.icon === 'users' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="m22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )}
                  {notification.icon === 'trophy' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                      <path d="M4 22h16" />
                      <path d="M10 14.66V17c0 .55.47.98.97 1.21C12.04 18.75 13 20.24 13 22" />
                      <path d="M14 14.66V17c0 .55-.47.98-.97 1.21C11.96 18.75 11 20.24 11 22" />
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>
                  )}
                  {notification.icon === 'warning' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  )}
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
          className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Scan Button */}
        <button
          onClick={() => router.push('/scanner')}
          className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
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