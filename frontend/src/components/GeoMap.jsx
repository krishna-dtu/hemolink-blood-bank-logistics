import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { hospitals } from '../data/mockData';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom hospital icon
const createHospitalIcon = (status) => {
  const color = status === 'critical' ? '#ff304f' : status === 'low' ? '#f59e0b' : '#1dd1a1';
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 0 10px ${color}80;
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const MapController = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

export const GeoMap = ({ compact = false, onHospitalSelect }) => {
  const center = [40.7128, -74.006];
  const zoom = compact ? 11 : 12;

  return (
    <div
      className={`w-full ${compact ? 'h-full' : 'h-[400px]'} rounded-lg overflow-hidden`}
      data-testid="geo-map"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={!compact}
        attributionControl={false}
      >
        <MapController />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {hospitals.map((hospital) => (
          <Marker
            key={hospital.id}
            position={[hospital.lat, hospital.lng]}
            icon={createHospitalIcon(hospital.status)}
            eventHandlers={{
              click: () => onHospitalSelect && onHospitalSelect(hospital),
            }}
          >
            <Popup className="hospital-popup">
              <div className="p-2">
                <h4 className="font-semibold text-sm">{hospital.name}</h4>
                <p className="text-xs text-gray-600">
                  {hospital.totalUnits} units available
                </p>
                <span
                  className={`inline-block mt-1 px-2 py-0.5 rounded text-xs capitalize ${
                    hospital.status === 'critical'
                      ? 'bg-red-100 text-red-700'
                      : hospital.status === 'low'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {hospital.status}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
