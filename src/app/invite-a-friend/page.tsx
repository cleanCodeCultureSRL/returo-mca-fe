'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { primary } from '../styles/colors';
import Header from '../components/Header';
import ThemeColor from '../components/ThemeColor';

export default function InviteAFriendPage() {
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const inviteLink = "https://invite.returosgr.ro/andrei123";
  const inviteMessage = "Salut! Te invit să încerci RetuRO - aplicația care te recompensează pentru reciclare. Descarcă-o aici: " + inviteLink;

  const handleBack = () => {
    router.push('/home');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleSend = () => {
    // Check if native share is available
    if (navigator.share) {
      navigator.share({
        title: 'RetuRO - Reciclează și câștigă',
        text: inviteMessage,
        url: inviteLink,
      }).catch((error) => {
        console.log('Error sharing:', error);
        // Fallback to custom modal
        setShowShareModal(true);
      });
    } else {
      // Fallback to custom modal
      setShowShareModal(true);
    }
  };

  const shareViaWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(inviteMessage)}`;
    window.open(whatsappUrl, '_blank');
    setShowShareModal(false);
  };

  const shareViaSMS = () => {
    const smsUrl = `sms:?body=${encodeURIComponent(inviteMessage)}`;
    window.open(smsUrl, '_self');
    setShowShareModal(false);
  };

  const shareViaEmail = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent('Te invit să încerci RetuRO!')}&body=${encodeURIComponent(inviteMessage)}`;
    window.open(emailUrl, '_self');
    setShowShareModal(false);
  };

  const shareViaFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}`;
    window.open(facebookUrl, '_blank');
    setShowShareModal(false);
  };

  const shareViaTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(inviteMessage)}`;
    window.open(twitterUrl, '_blank');
    setShowShareModal(false);
  };

  const shareViaTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent('Te invit să încerci RetuRO - aplicația care te recompensează pentru reciclare!')}`;
    window.open(telegramUrl, '_blank');
    setShowShareModal(false);
  };

  const copyLinkAndShare = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopySuccess(true);
      setShowShareModal(false);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: primary.lightGreen }}>
      <ThemeColor color="#D2ECDE" />

      {/* Header - Same as home page */}
      <Header />

      {/* Main Content */}
      <div className="px-4 pb-4 space-y-6 mt-4">
        {/* Invite Card */}
        <div className="bg-white rounded-3xl border-3 border-black pt-6 pl-6 pr-6 relative overflow-hidden">
          {/* Title */}
          <h2 className="text-black text-3xl font-euclid-bold mb-4">Invită prieteni</h2>

          {/* Description */}
          <p className="text-black text-lg font-euclid-regular mb-6 leading-relaxed">
            Invită-ți prietenii să se alăture platformei RetuRO și să contribuie la un mediu mai curat împreună
          </p>

          {/* Invite Link */}
          <div className="relative mb-8">
            <div className="bg-gray-100 rounded-full p-4 pr-16 border-2 border-black">
              <span className="text-black text-base font-euclid-regular">
                {inviteLink}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-primary-green rounded-full flex items-center justify-center touchable-opacity"
            >
              {copySuccess ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <div className="relative w-64 h-48">
              <Image
                src="/illustrations/invite_illustration.png"
                alt="Invite illustration"
                fill
                className="object-contain"
              />
            </div>
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

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="flex-1 bg-black text-white py-4 px-8 rounded-full text-lg font-euclid-bold touchable-opacity shadow-lg ml-4"
        >
          Trimite
        </button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 pointer-events-auto"
            onClick={() => setShowShareModal(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white rounded-t-3xl p-6 animate-slide-up pointer-events-auto border-4 border-black border-b-0">
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-black text-xl font-euclid-bold mb-2">Trimite invitația</h3>
              <p className="text-gray-600 text-sm font-euclid-regular">Alege platforma preferată pentru a trimite invitația</p>
            </div>

            {/* Share Options Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* WhatsApp */}
              <button
                onClick={shareViaWhatsApp}
                className="flex flex-col items-center p-4 rounded-2xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors touchable-opacity"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.720" />
                  </svg>
                </div>
                <span className="text-xs font-euclid-medium text-black">WhatsApp</span>
              </button>

              {/* SMS */}
              <button
                onClick={shareViaSMS}
                className="flex flex-col items-center p-4 rounded-2xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors touchable-opacity"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                  </svg>
                </div>
                <span className="text-xs font-euclid-medium text-black">SMS</span>
              </button>

              {/* Email */}
              <button
                onClick={shareViaEmail}
                className="flex flex-col items-center p-4 rounded-2xl border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-colors touchable-opacity"
              >
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-2">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <span className="text-xs font-euclid-medium text-black">Email</span>
              </button>

              {/* Facebook */}
              <button
                onClick={shareViaFacebook}
                className="flex flex-col items-center p-4 rounded-2xl border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-colors touchable-opacity"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="text-xs font-euclid-medium text-black">Facebook</span>
              </button>

              {/* Twitter */}
              <button
                onClick={shareViaTwitter}
                className="flex flex-col items-center p-4 rounded-2xl border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-colors touchable-opacity"
              >
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-2">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span className="text-xs font-euclid-medium text-black">Twitter</span>
              </button>

              {/* Telegram */}
              <button
                onClick={shareViaTelegram}
                className="flex flex-col items-center p-4 rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors touchable-opacity"
              >
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mb-2">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.820 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </div>
                <span className="text-xs font-euclid-medium text-black">Telegram</span>
              </button>
            </div>

            {/* Copy Link Button */}
            <button
              onClick={copyLinkAndShare}
              className="w-full bg-black text-white py-4 rounded-2xl font-euclid-bold text-base hover:bg-gray-800 transition-colors touchable-opacity mb-4"
            >
              Copiază link-ul
            </button>

            {/* Close Button */}
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full bg-gray-100 text-black py-3 rounded-2xl font-euclid-medium text-base hover:bg-gray-200 transition-colors touchable-opacity"
            >
              Anulează
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 