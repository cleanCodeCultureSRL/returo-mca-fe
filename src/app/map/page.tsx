'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import mapboxgl from 'mapbox-gl';
import { primary } from '../styles/colors';
import Header from '../components/Header';

interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'returo' | 'current';
}

const locations: Location[] = [
  {
    id: '1',
    name: 'RetuRO Kaufland Baneasa',
    address: 'Sos. Bucuresti-Ploiesti 42A',
    latitude: 44.5040,
    longitude: 26.0770,
    type: 'returo'
  },
  {
    id: '2',
    name: 'RetuRO Carrefour Unirii',
    address: 'Bd. Unirii 45',
    latitude: 44.4300,
    longitude: 26.1050,
    type: 'returo'
  },
  {
    id: '3',
    name: 'RetuRO Auchan Titan',
    address: 'Bd. 1 Decembrie 1918 33',
    latitude: 44.4250,
    longitude: 26.1400,
    type: 'returo'
  },
  {
    id: '4',
    name: 'RetuRO Mega Mall',
    address: 'Bd. Pierre de Coubertin 3-5',
    latitude: 44.4520,
    longitude: 26.0480,
    type: 'returo'
  },
  {
    id: '5',
    name: 'RetuRO Promenada Mall',
    address: 'Calea Floreasca 246B',
    latitude: 44.4800,
    longitude: 26.1020,
    type: 'returo'
  },
  {
    id: '6',
    name: 'RetuRO Carrefour Militari',
    address: 'Bd. Iuliu Maniu 558',
    latitude: 44.4380,
    longitude: 26.0260,
    type: 'returo'
  },
  {
    id: '7',
    name: 'RetuRO Lidl Pantelimon',
    address: 'Sos. Pantelimon 243',
    latitude: 44.4520,
    longitude: 26.1650,
    type: 'returo'
  },
  {
    id: '8',
    name: 'RetuRO Cora Lujerului',
    address: 'Bd. Timisoara 26',
    latitude: 44.4200,
    longitude: 26.0380,
    type: 'returo'
  },
  {
    id: '9',
    name: 'RetuRO Metro Militari',
    address: 'Bd. Iuliu Maniu 540',
    latitude: 44.4350,
    longitude: 26.0200,
    type: 'returo'
  },
  {
    id: '10',
    name: 'RetuRO Selgros Militari',
    address: 'Bd. Iuliu Maniu 594',
    latitude: 44.4400,
    longitude: 26.0150,
    type: 'returo'
  },
  {
    id: '11',
    name: 'RetuRO Carrefour Colentina',
    address: 'Bd. Colentina 2',
    latitude: 44.4650,
    longitude: 26.1350,
    type: 'returo'
  },
  {
    id: '12',
    name: 'RetuRO Auchan Drumul Taberei',
    address: 'Bd. Timisoara 26',
    latitude: 44.4150,
    longitude: 26.0450,
    type: 'returo'
  },
  {
    id: '13',
    name: 'RetuRO Kaufland Vitan',
    address: 'Bd. Vitan 55-59',
    latitude: 44.4020,
    longitude: 26.1250,
    type: 'returo'
  },
  {
    id: '14',
    name: 'RetuRO Carrefour Feeria',
    address: 'Bd. Theodor Pallady 51',
    latitude: 44.4100,
    longitude: 26.1450,
    type: 'returo'
  },
  {
    id: '15',
    name: 'RetuRO Lidl Calea Vitan',
    address: 'Calea Vitan 55-59',
    latitude: 44.4050,
    longitude: 26.1180,
    type: 'returo'
  },
  {
    id: '16',
    name: 'RetuRO Cora Pantelimon',
    address: 'Sos. Pantelimon 348',
    latitude: 44.4480,
    longitude: 26.1780,
    type: 'returo'
  },
  {
    id: '17',
    name: 'RetuRO Carrefour Orhideea',
    address: 'Bd. Orhideelor 15A',
    latitude: 44.4680,
    longitude: 26.0650,
    type: 'returo'
  },
  {
    id: '18',
    name: 'RetuRO Lidl Calea Dorobantilor',
    address: 'Calea Dorobantilor 239',
    latitude: 44.4720,
    longitude: 26.0920,
    type: 'returo'
  },
  {
    id: '19',
    name: 'RetuRO Kaufland Bucur Obor',
    address: 'Calea Obor 24',
    latitude: 44.4520,
    longitude: 26.1200,
    type: 'returo'
  },
  {
    id: '20',
    name: 'RetuRO Carrefour Alexandriei',
    address: 'Bd. Alexandriei 171',
    latitude: 44.3950,
    longitude: 26.1120,
    type: 'returo'
  },
  {
    id: '21',
    name: 'RetuRO Auchan Drumul Taberei',
    address: 'Bd. Ghencea 120',
    latitude: 44.4080,
    longitude: 26.0520,
    type: 'returo'
  },
  {
    id: '22',
    name: 'RetuRO Metro Baneasa',
    address: 'Sos. Bucuresti-Ploiesti 10A',
    latitude: 44.5100,
    longitude: 26.0800,
    type: 'returo'
  },
  {
    id: '23',
    name: 'RetuRO Lidl Calea Grivitei',
    address: 'Calea Grivitei 143',
    latitude: 44.4580,
    longitude: 26.0780,
    type: 'returo'
  },
  {
    id: '24',
    name: 'RetuRO Carrefour Plaza Romania',
    address: 'Bd. Timisoara 26',
    latitude: 44.4320,
    longitude: 26.0680,
    type: 'returo'
  },
  {
    id: 'current',
    name: 'Locația ta',
    address: 'Centrul Bucureștiului',
    latitude: 44.4280,
    longitude: 26.1020,
    type: 'current'
  }
];

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [dragProgress, setDragProgress] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [currentUserLocation, setCurrentUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const currentLocationMarker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    // Set the access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYW5kcmVpcGF0emEiLCJhIjoiY21jdDVtYTFsMDFkdjJ4cjMzMzNidmtibCJ9.DlZWQ2y7n4Od6j-jz-2cvw';

    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/andreipatza/cmct5ptr3055701qw3owp89zl',
      center: [26.1025, 44.4268],
      zoom: 13,
      attributionControl: false
    });

    // Add markers for each location
    locations.forEach((location) => {
      if (!map.current) return;

      // Create a DOM element for the marker using the PNG image
      const el = document.createElement('div');
      el.className = 'w-8 h-8 cursor-pointer transition-all hover:scale-110';

      // Use different icons for different location types
      const iconSrc = location.type === 'current' ? '/icons/current_location_icon.png' : '/icons/map_location_icon.png';
      el.innerHTML = `<img src="${iconSrc}" alt="${location.name}" class="w-full h-full object-contain" />`;

      // Create popup content
      const popupContent = `
        <div class="bg-white p-3 rounded-lg shadow-lg">
          <h4 class="font-euclid-bold text-sm text-black">${location.name}</h4>
          <p class="font-euclid-regular text-xs text-gray-600">${location.address}</p>
        </div>
      `;

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        className: 'mapbox-popup'
      })
        .setHTML(popupContent);

      // Add click event to marker
      el.addEventListener('click', () => {
        setSelectedLocation(location);
        setIsExpanded(false);
        setDragProgress(0);
      });

      // Create marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.longitude, location.latitude])
        .setPopup(popup)
        .addTo(map.current);

      // Store reference to current location marker for updates
      if (location.type === 'current') {
        currentLocationMarker.current = marker;
      }
    });

    // Fit map to show all locations
    map.current.on('load', () => {
      if (!map.current) return;

      // Create bounds that include all locations
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach((location) => {
        bounds.extend([location.longitude, location.latitude]);
      });

      // Fit the map to the bounds with some padding
      map.current.fitBounds(bounds, {
        padding: { top: 100, bottom: 350, left: 50, right: 50 },
        maxZoom: 14
      });
    });



    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const filteredLocations = locations.filter(location =>
    location.type === 'returo' &&
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Zoom to selected location whenever it changes
  useEffect(() => {
    if (selectedLocation && map.current) {
      map.current.flyTo({
        center: [selectedLocation.longitude, selectedLocation.latitude],
        zoom: 15,
        duration: 1000
      });
    }
  }, [selectedLocation]);

  // Request user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setCurrentUserLocation(userLocation);

          // Update the current location marker on the map
          if (currentLocationMarker.current) {
            currentLocationMarker.current.setLngLat([userLocation.longitude, userLocation.latitude]);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  }, []);

  // Open navigation apps (Google Maps or Waze)
  const openNavigationApp = () => {
    if (!selectedLocation) return;

    const destination = `${selectedLocation.latitude},${selectedLocation.longitude}`;

    // Create a modal or action sheet for user to choose
    const userChoice = window.confirm(
      `Navigate to ${selectedLocation.name}?\n\nOK - Open Google Maps\nCancel - Open Waze`
    );

    if (userChoice) {
      // Try to open Google Maps
      const googleMapsUrl = `https://maps.google.com/maps?daddr=${destination}&dirflg=d`;
      const googleMapsApp = `comgooglemaps://?daddr=${destination}&directionsmode=driving`;

      // Try native app first, fallback to web
      const link = document.createElement('a');
      link.href = googleMapsApp;
      link.click();

      // Fallback to web version after a short delay
      setTimeout(() => {
        window.open(googleMapsUrl, '_blank');
      }, 1000);
    } else {
      // Try to open Waze
      const wazeUrl = `https://waze.com/ul?ll=${destination}&navigate=yes&zoom=17`;
      const wazeApp = `waze://?ll=${destination}&navigate=yes`;

      // Try native app first, fallback to web
      const link = document.createElement('a');
      link.href = wazeApp;
      link.click();

      // Fallback to web version after a short delay
      setTimeout(() => {
        window.open(wazeUrl, '_blank');
      }, 1000);
    }
  };

  // Center map on current user location
  const centerOnCurrentLocation = () => {
    if (currentUserLocation && map.current) {
      map.current.flyTo({
        center: [currentUserLocation.longitude, currentUserLocation.latitude],
        zoom: 15,
        duration: 1000
      });
    } else {
      // If no current location, request it
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            setCurrentUserLocation(userLocation);

            // Update the current location marker on the map
            if (currentLocationMarker.current) {
              currentLocationMarker.current.setLngLat([userLocation.longitude, userLocation.latitude]);
            }

            if (map.current) {
              map.current.flyTo({
                center: [userLocation.longitude, userLocation.latitude],
                zoom: 15,
                duration: 1000
              });
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            alert('Unable to get your location. Please enable location services.');
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    }
  };



  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartY(clientY);
  };



  const handleDragEnd = () => {
    setIsDragging(false);
    // Snap to expanded or collapsed based on drag progress
    if (dragProgress > 0.3) {
      setIsExpanded(true);
      setDragProgress(1);
    } else {
      setIsExpanded(false);
      setDragProgress(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        const clientY = e.clientY;
        const deltaY = startY - clientY;
        const progress = Math.max(0, Math.min(1, deltaY / 300));
        setDragProgress(progress);
      };

      const handleTouchMove = (e: TouchEvent) => {
        const clientY = e.touches[0].clientY;
        const deltaY = startY - clientY;
        const progress = Math.max(0, Math.min(1, deltaY / 300));
        setDragProgress(progress);
      };

      const handleMouseUp = () => handleDragEnd();
      const handleTouchEnd = () => handleDragEnd();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, startY, dragProgress]);

  return (
    <div className="min-h-screen relative">
      {/* Full Screen Map */}
      <div className="absolute inset-0">
        <div ref={mapContainer} className="w-full h-full" />
      </div>

      {/* Header - Absolutely positioned over the map */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <Header userName="Andrei" balance="1.832,05" currency="Ron" />
      </div>

      {/* Center Position Button */}
      <div
        className="absolute right-4 z-20 transition-all duration-300 ease-out"
        style={{
          bottom: isExpanded
            ? `calc(60vh + 20px)`
            : selectedLocation
              ? `calc(28vh + 20px)`
              : `calc(min(70vh, ${340 + dragProgress * 400}px) + 20px)`
        }}
      >
        <button
          onClick={centerOnCurrentLocation}
          className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        >
          <Image
            src="/icons/center_position_icon.png"
            alt="Center Position"
            width={24}
            height={24}
            className="w-[60px] h-[60px]"
          />
        </button>
      </div>

      {/* Bottom Card */}
      <div
        className={`absolute bottom-0 left-0 right-0 rounded-t-3xl p-6 shadow-2xl transition-all duration-300 ease-out flex flex-col ${isExpanded ? 'h-[60vh]' : 'h-auto'
          }`}
        style={{
          background: `linear-gradient(135deg, ${primary.lightGreen} 0%, #ffffff 100%)`,
          height: isExpanded
            ? '60vh'
            : selectedLocation
              ? '28vh'
              : `min(70vh, ${340 + dragProgress * 400}px)`,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Drag Handle - Black Up Arrow */}
        <div
          className="flex justify-center mb-2 cursor-pointer select-none"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onClick={() => {
            setIsExpanded(!isExpanded);
            setDragProgress(isExpanded ? 0 : 1);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"

            fill="none"
            className="text-black transform transition-transform duration-200 hover:scale-110"
            style={{
              transform: `rotate(${dragProgress * 180}deg)`
            }}
          >
            <path
              d="M6 15L12 9L18 15"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {selectedLocation ? (
          /* Selected Location Details */
          <div className="flex flex-col h-full space-y-6">
            {/* Location Header */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                <Image
                  src="/icons/map_location_icon.png"
                  alt="Location"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-black text-2xl font-euclid-bold">
                  {selectedLocation.name.replace('RetuRO ', '')}
                </h2>
                <p className="text-gray-600 text-base font-euclid-regular">
                  {selectedLocation.address}
                </p>
              </div>
            </div>



            {/* Expanded Content - Only shown when expanded */}
            {isExpanded && (
              <div className="space-y-6">
                {/* Schedule */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-black text-base font-euclid-regular">Orar - <span className="text-green-500 font-euclid-medium">Deschis</span></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black text-lg font-euclid-bold">Luni - Vineri</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-black text-lg font-euclid-bold">07:00 - 23:00</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black text-lg font-euclid-semibold">Sambata - Duminica</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-black text-lg font-euclid-bold">07:00 - 20:00</span>
                    </div>
                  </div>
                </div>

                {/* Wait Time */}
                <div className="space-y-2">
                  <h3 className="text-black text-lg font-euclid-semibold">Timp de așteptare</h3>
                  <p className="text-black text-base font-euclid-regular">Status - <span className="text-green-500 font-euclid-medium">Liber</span></p>
                  <div className="flex items-center space-x-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                    <span className="text-black text-xl font-euclid-bold">14:32</span>
                  </div>
                </div>
              </div>
            )}


          </div>
        ) : (
          /* Search and List View */
          <div className="flex flex-col h-full">
            {/* Search Section */}
            <div className="mb-6">
              <h2 className="text-black text-l font-euclid-regular mb-4">Caută centrul de reciclare dorit</h2>

              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Caută..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-black rounded-full text-gray-600 font-euclid-regular focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                />
              </div>
            </div>

            {/* Centers Section */}
            <div>
              <h3 className="text-black text-lg font-euclid-semibold mb-4">Centrele din zona</h3>

              {/* Unified Location List Style */}
              <div className={`space-y-4 ${isExpanded ? 'max-h-[calc(60vh-280px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100' : 'max-h-[200px] overflow-hidden'}`}>
                {filteredLocations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      setSelectedLocation(location);
                      setIsExpanded(false);
                      setDragProgress(0);
                    }}
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <Image
                        src="/icons/map_location_icon.png"
                        alt="Location"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-black text-lg font-euclid-bold">
                        {location.name}
                      </h4>
                      <p className="text-gray-600 text-sm font-euclid-regular">
                        {location.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Permanent Action Buttons at Bottom - Always visible */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-6 z-30">
        <button
          onClick={() => setSelectedLocation(null)}
          className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg">
          <Image
            src="/icons/open_camera_icon.png"
            alt="Scan"
            width={24}
            height={24}
            className="w-6 h-6 filter brightness-0 invert"
          />
        </button>

        {selectedLocation ? (
          <button
            onClick={openNavigationApp}
            className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
          >
            <Image
              src="/icons/navigate_icon.png"
              alt="Navigate"
              width={24}
              height={24}
              className="w-6 h-6 filter brightness-0 invert"
            />
          </button>
        ) : (
          <div className="w-16 h-16"></div> /* Spacer for symmetry */
        )}
      </div>
    </div>
  );
} 