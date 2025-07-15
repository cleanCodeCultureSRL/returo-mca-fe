import { useEffect } from 'react';

interface DemoDisclaimerProps {
  show: boolean;
  onHide?: () => void;
  autoHideDelay?: number;
}

export default function DemoDisclaimer({ show, onHide, autoHideDelay = 2000 }: DemoDisclaimerProps) {
  useEffect(() => {
    if (show && onHide) {
      const timer = setTimeout(() => {
        onHide();
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [show, onHide, autoHideDelay]);

  if (!show) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black text-white px-6 py-3 rounded-full shadow-lg font-euclid-regular text-l text-center flex items-center justify-center">
      Această funcționalitate nu este disponibilă, încă 🙂
    </div>
  );
} 