'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ThemeColor from '../components/ThemeColor';

export default function ScannerPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Add a small delay before starting camera on iOS to ensure DOM is ready
    const startDelay = /iPad|iPhone|iPod/.test(navigator.userAgent) ? 100 : 0;

    const timer = setTimeout(() => {
      startCamera();
    }, startDelay);

    return () => {
      clearTimeout(timer);
      stopCamera();
    };
  }, []);

  const runDiagnostics = () => {
    const info = [];
    info.push(`User Agent: ${navigator.userAgent}`);
    info.push(`Platform: ${navigator.platform}`);
    info.push(`Protocol: ${window.location.protocol}`);
    info.push(`Host: ${window.location.host}`);
    info.push(`MediaDevices: ${!!navigator.mediaDevices}`);
    info.push(`getUserMedia: ${!!navigator.mediaDevices?.getUserMedia}`);
    info.push(`Permissions API: ${!!navigator.permissions}`);
    info.push(`Is PWA: ${window.matchMedia('(display-mode: standalone)').matches}`);
    info.push(`Is iOS: ${/iPad|iPhone|iPod/.test(navigator.userAgent)}`);
    info.push(`Is Safari: ${/^((?!chrome|android).)*safari/i.test(navigator.userAgent)}`);

    // Video element diagnostics
    if (videoRef.current) {
      info.push(`Video Element: Found`);
      info.push(`Video Ready State: ${videoRef.current.readyState}`);
      info.push(`Video Paused: ${videoRef.current.paused}`);
      info.push(`Video Muted: ${videoRef.current.muted}`);
      info.push(`Video Width: ${videoRef.current.videoWidth}`);
      info.push(`Video Height: ${videoRef.current.videoHeight}`);
      info.push(`Video Current Time: ${videoRef.current.currentTime}`);
      info.push(`Video Duration: ${videoRef.current.duration}`);
      info.push(`Video Src Object: ${!!videoRef.current.srcObject}`);
      info.push(`Video Display: ${window.getComputedStyle(videoRef.current).display}`);
      info.push(`Video Visibility: ${window.getComputedStyle(videoRef.current).visibility}`);
      info.push(`Video Opacity: ${window.getComputedStyle(videoRef.current).opacity}`);

      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        info.push(`Stream Active: ${stream.active}`);
        info.push(`Stream Tracks: ${stream.getTracks().length}`);
        stream.getTracks().forEach((track, index) => {
          info.push(`Track ${index}: ${track.kind} - ${track.readyState} - ${track.enabled}`);
        });
      }
    } else {
      info.push(`Video Element: Not Found`);
    }

    setDebugInfo(info.join('\n'));
  };

  const startCamera = async () => {
    try {
      setError(null);
      setShowStartButton(false);
      setCameraStarted(false);

      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      // iOS-specific constraints with more conservative settings
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const constraintOptions = isIOS ? [
        // iOS-optimized constraints
        {
          video: {
            facingMode: 'environment',
            width: { ideal: 640, max: 1280 },
            height: { ideal: 480, max: 720 },
            frameRate: { ideal: 15, max: 30 }
          }
        },
        {
          video: {
            facingMode: 'environment',
            width: { ideal: 480 },
            height: { ideal: 360 }
          }
        },
        {
          video: {
            facingMode: 'environment'
          }
        },
        {
          video: true
        }
      ] : [
        // Standard constraints for other devices
        {
          video: {
            facingMode: { exact: 'environment' },
            width: { ideal: 640, max: 1280 },
            height: { ideal: 480, max: 720 }
          }
        },
        {
          video: {
            facingMode: 'environment',
            width: { ideal: 640, max: 1280 },
            height: { ideal: 480, max: 720 }
          }
        },
        {
          video: {
            facingMode: 'environment'
          }
        },
        {
          video: true
        }
      ];

      let stream = null;
      let lastError = null;

      // Try each constraint configuration
      for (const constraints of constraintOptions) {
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          console.log('Camera stream obtained with constraints:', constraints);
          break; // Success, exit loop
        } catch (err) {
          lastError = err;
          console.warn('Camera constraint failed:', constraints, err);
        }
      }

      if (!stream) {
        throw lastError || new Error('No camera available');
      }

      if (videoRef.current) {
        // Stop any existing stream
        if (videoRef.current.srcObject) {
          const existingStream = videoRef.current.srcObject as MediaStream;
          existingStream.getTracks().forEach(track => track.stop());
        }

        // Set up video element for iOS
        const video = videoRef.current;
        video.srcObject = stream;

        // iOS-specific video setup - must be done before setting srcObject
        video.setAttribute('playsinline', 'true');
        video.setAttribute('webkit-playsinline', 'true');
        video.setAttribute('autoplay', 'true');
        video.muted = true;
        video.controls = false;
        video.disablePictureInPicture = true;

        // Add event listeners for stream monitoring
        stream.getTracks().forEach(track => {
          track.addEventListener('ended', () => {
            console.log('Camera track ended');
            setError('Camera stream ended unexpectedly');
            setCameraStarted(false);
          });
        });

        // Enhanced play function for iOS
        const playVideo = async () => {
          try {
            if (!video || !video.srcObject) return;

            // Ensure video is visible
            video.style.display = 'block';
            video.style.visibility = 'visible';
            video.style.opacity = '1';

            // Force load metadata first
            video.load();

            // Wait for metadata to load
            await new Promise((resolve, reject) => {
              if (video.readyState >= 1) {
                resolve(true);
                return;
              }

              const onLoadedMetadata = () => {
                video.removeEventListener('loadedmetadata', onLoadedMetadata);
                video.removeEventListener('error', onError);
                resolve(true);
              };

              const onError = (e: Event) => {
                video.removeEventListener('loadedmetadata', onLoadedMetadata);
                video.removeEventListener('error', onError);
                reject(e);
              };

              video.addEventListener('loadedmetadata', onLoadedMetadata);
              video.addEventListener('error', onError);
            });

            await video.play();
            setCameraStarted(true);

            console.log('Video playing successfully, dimensions:', {
              videoWidth: video.videoWidth,
              videoHeight: video.videoHeight,
              readyState: video.readyState,
              paused: video.paused,
              muted: video.muted
            });

          } catch (playError) {
            console.error('Error playing video:', playError);

            // iOS-specific retry logic
            if (isIOS) {
              setTimeout(async () => {
                try {
                  if (video && video.srcObject) {
                    await video.play();
                    setCameraStarted(true);
                    console.log('Video playing successfully on iOS retry');
                  }
                } catch (retryError) {
                  console.error('iOS retry play failed:', retryError);
                  setError('Nu se poate porni camera pentru scanarea voucherelor. Apasă butonul pentru a încerca din nou.');
                  setShowStartButton(true);
                }
              }, 1000);
            } else {
              setError('Nu se poate porni camera pentru scanarea voucherelor. Încercați să reîncărcați pagina.');
              setShowStartButton(true);
            }
          }
        };

        // Start playing video
        playVideo();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setShowStartButton(true);
      setCameraStarted(false);

      // More specific error messages
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('Accesul la cameră a fost refuzat. Pentru a scana vouchere, acordați permisiunea pentru cameră. iOS: Setări > Safari > Cameră și activați accesul.');
        } else if (err.name === 'NotFoundError') {
          setError('Nu s-a găsit o cameră disponibilă pe acest dispozitiv pentru scanarea voucherelor.');
        } else if (err.name === 'NotSupportedError') {
          setError('Camera nu este suportată în acest browser. Pentru scanarea voucherelor, încercați să deschideți aplicația în Safari.');
        } else if (err.name === 'OverconstrainedError') {
          setError('Cameră indisponibilă cu setările curente. Încercați din nou pentru a scana vouchere.');
        } else {
          setError('Nu se poate accesa camera pentru scanarea voucherelor. Verificați că folosiți HTTPS și că browserul are permisiuni pentru cameră.');
        }
      } else {
        setError('Nu se poate accesa camera pentru scanarea voucherelor. Vă rugăm să încercați din nou.');
      }
    }
  };

  const stopCamera = () => {
    try {
      if (videoRef.current) {
        // Pause video first
        videoRef.current.pause();

        // Stop all tracks
        if (videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => {
            track.stop();
            console.log('Camera track stopped:', track.kind);
          });
        }

        // Clear video source
        videoRef.current.srcObject = null;
        videoRef.current.src = '';

        // Remove event listeners
        videoRef.current.onloadedmetadata = null;
        videoRef.current.oncanplay = null;
        videoRef.current.onloadeddata = null;
        videoRef.current.onerror = null;
      }
    } catch (error) {
      console.error('Error stopping camera:', error);
    }

    setCameraStarted(false);
  };

  const handleBack = () => {
    stopCamera();
    router.push('/home');
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      try {
        // Set canvas dimensions to match video
        const canvas = canvasRef.current;
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw current video frame to canvas
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Convert canvas to data URL
          const captureDataUrl = canvas.toDataURL('image/jpeg', 0.9);
          setCapturedImage(captureDataUrl);

          console.log('Image captured successfully');
        }
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    }

    setShowSuccessModal(true);
  };



  const handleViewArchive = () => {
    router.push('/voucher-history');
  };

  const handleScanAnother = () => {
    setShowSuccessModal(false);
    setCapturedImage(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <ThemeColor color="black" />
        <div className="text-white text-center p-4">
          <p className="mb-6">{error}</p>
          <div className="space-y-4">
            <button
              onClick={() => {
                setError(null);
                setShowStartButton(true);
              }}
              className="bg-white text-black px-6 py-3 rounded-full text-lg font-euclid-bold hover:bg-gray-100 transition-colors mr-4 touchable-opacity"
            >
              Încercați din nou
            </button>
            <button
              onClick={() => router.push('/home')}
              className="bg-gray-600 text-white px-6 py-3 rounded-full text-lg font-euclid-bold hover:bg-gray-500 transition-colors touchable-opacity"
            >
              Înapoi
            </button>
            <button
              onClick={runDiagnostics}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-euclid-regular hover:bg-blue-500 transition-colors touchable-opacity"
            >
              Informații tehnice
            </button>
            {debugInfo && (
              <div className="mt-4 p-3 bg-gray-800 rounded-lg text-left">
                <pre className="text-xs whitespace-pre-wrap">{debugInfo}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="no-scroll-page bg-black overflow-hidden">
      <ThemeColor color="black" />
      {/* Top Disclaimer */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="p-6 pt-12">
          <p className="text-white text-lg font-euclid-regular leading-relaxed">
            Scanează voucherul sau codul de bare pentru a-l adăuga în arhiva ta
          </p>
        </div>
      </div>

      {/* Camera View */}
      <div className="relative w-full h-full">
        {/* Hidden canvas for capturing */}
        <canvas
          ref={canvasRef}
          className="hidden"
        />

        {/* Show captured image if available, otherwise show video */}
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured"
            className="absolute inset-0 w-full h-full object-cover z-10"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              minHeight: '100vh',
            }}
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            webkit-playsinline="true"
            controls={false}
            disablePictureInPicture
            className="absolute inset-0 w-full h-full object-cover z-10"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              minHeight: '100vh',
              background: 'transparent',
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)'
            }}
          />
        )}

        {/* Start Camera Button for iOS */}
        {showStartButton && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="text-center">
              <button
                onClick={startCamera}
                className="bg-white text-black px-8 py-4 rounded-full text-lg font-euclid-bold hover:bg-gray-100 transition-colors mb-4 touchable-opacity"
              >
                Pornește camera
              </button>
              <p className="text-white text-sm font-euclid-regular mb-2">
                Apasă pentru a accesa camera
              </p>
              <p className="text-white text-xs font-euclid-regular opacity-80">
                Pentru scanarea voucherelor și codurilor de bare
              </p>
            </div>
          </div>
        )}

        {/* Dark overlay around scanning area - only show when camera is started and no image captured */}
        {cameraStarted && !capturedImage && <div className="absolute inset-0 bg-black/30 z-20"></div>}

        {/* Barcode Scanning Rectangle - only show when camera is started and no image captured */}
        {cameraStarted && !capturedImage && (
          <div className="absolute inset-0 flex items-center justify-center z-30 px-4">
            <div className="relative w-full">
              {/* Yellow Rectangle Border */}
              <div className="w-full h-48 border-4 border-yellow-400 rounded-lg relative">
                {/* Corner indicators */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-400 rounded-tl-lg"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-400 rounded-tr-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-400 rounded-bl-lg"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-400 rounded-br-lg"></div>

                {/* Scanning line animation */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400 animate-pulse"></div>
                </div>
              </div>

              {/* Instruction text */}
              <p className="text-white text-center mt-4 font-euclid-regular">
                Poziționează codul de bare în dreptunghi și apasă butonul de captură
              </p>
            </div>
          </div>
        )}

        {/* Video status indicator for debugging */}
        {/* {cameraStarted && !capturedImage && (
          <div className="absolute top-4 right-4 z-40 bg-green-500 text-white px-3 py-2 rounded-full text-xs font-euclid-semibold">
            Camera activă
          </div>
        )} */}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-black text-white rounded-t-3xl w-full max-w-md p-6 space-y-6">
            {/* Success Illustration */}
            <div className="flex justify-center">
              <div className="relative">
                <svg width="120" height="120" viewBox="0 0 120 120" className="text-green-500">
                  <circle cx="60" cy="60" r="60" fill="currentColor" opacity="0.9" />
                  <circle cx="60" cy="60" r="40" fill="currentColor" />
                  <path d="M45 60l10 10 20-20" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Person illustration */}
                <div className="absolute -bottom-2 -right-2">
                  <svg width="60" height="60" viewBox="0 0 60 60" className="text-white">
                    <circle cx="30" cy="20" r="8" fill="currentColor" />
                    <path d="M15 55 L45 55 L40 35 L20 35 Z" fill="currentColor" />
                    <rect x="25" y="28" width="10" height="20" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center space-y-4">
              <p className="text-lg font-euclid-regular leading-relaxed">
                Voucherul a fost adăugat cu succes în arhiva ta și vei primi puncte de recompensă
              </p>

              {/* View Archive Button */}
              <button
                onClick={handleViewArchive}
                className="text-white text-lg font-euclid-semibold underline hover:opacity-80 transition-opacity touchable-opacity"
              >
                Vezi arhiva
              </button>
            </div>

            {/* Scan Another Button */}
            <button
              onClick={handleScanAnother}
              className="w-full bg-white text-black py-4 rounded-full text-lg font-euclid-bold hover:bg-gray-100 transition-colors touchable-opacity"
            >
              Scanează alt voucher
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation - hide when modal is shown */}
      {!showSuccessModal && (
        <div className="absolute bottom-8 left-0 right-0 px-6 z-30">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="w-16 h-16 bg-white/90 text-black rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg touchable-opacity"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* Scan/Capture Button - Centered */}
            <button
              onClick={handleCapture}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg border-4 border-white touchable-opacity"
            >
              <div className="w-16 h-16 bg-transparent border-2 border-black rounded-full"></div>
            </button>

            {/* Spacer to keep scan button centered */}
            <div className="w-16 h-16"></div>
          </div>
        </div>
      )}
    </div>
  );
} 