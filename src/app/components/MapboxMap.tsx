'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import mapboxgl from 'mapbox-gl';

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
    name: 'RetuRO Kaufland',
    address: 'Str. Principala 123',
    latitude: 44.4268,
    longitude: 26.1025,
    type: 'returo'
  },
  {
    id: '2',
    name: 'RetuRO Carrefour',
    address: 'Bd. Unirii 45',
    latitude: 44.4300,
    longitude: 26.1050,
    type: 'returo'
  },
  {
    id: '3',
    name: 'RetuRO Auchan',
    address: 'Calea Victoriei 67',
    latitude: 44.4250,
    longitude: 26.1000,
    type: 'returo'
  },
  {
    id: 'current',
    name: 'Locația ta',
    address: 'Sos. Lorem ipsum sit dolor 42a',
    latitude: 44.4280,
    longitude: 26.1020,
    type: 'current'
  }
];

export default function MapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Clean up any existing map instance
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    // Set the access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYW5kcmVpcGF0emEiLCJhIjoiY21jdDVtYTFsMDFkdjJ4cjMzMzNidmtibCJ9.DlZWQ2y7n4Od6j-jz-2cvw';

    if (!mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/andreipatza/cmct5ptr3055701qw3owp89zl',
      center: [26.1025, 44.4268],
      zoom: 13,
      attributionControl: false
    });

    // Wait for map to load before adding markers
    map.current.on('load', () => {
      // Add markers for each location
      locations.forEach((location) => {
        if (!map.current) return;

        // Create a DOM element for the marker using the PNG image
        const el = document.createElement('div');
        el.className = 'w-8 h-8 cursor-pointer transition-all hover:scale-110';

        // Use different icons for different location types
        const iconSrc = location.type === 'current' ? '/icons/map_location_icon.png' : '/icons/map_location_icon.png';
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

        // Add marker to map with popup
        new mapboxgl.Marker(el)
          .setLngLat([location.longitude, location.latitude])
          .setPopup(popup)
          .addTo(map.current);
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-black rounded-3xl relative overflow-hidden h-64">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Content Overlay */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
        {/* Text Content */}
        <div>
          <h3 className="text-white text-sm font-euclid-regular mb-1 drop-shadow-lg">Cel mai apropiat RVM</h3>
          <p className="text-white text-xl font-euclid-bold drop-shadow-lg">RetuRO Kaufland Dristor</p>
        </div>

        {/* Location Button */}
        <button className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
          <Image
            src="/icons/location_icon.png"
            alt="Location"
            width={24}
            height={24}
            className="w-[50px] h-[50px]"
          />
        </button>
      </div>
    </div>
  );
} 