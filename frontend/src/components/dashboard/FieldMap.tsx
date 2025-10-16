'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import L from 'leaflet';
import type { Field } from '@/lib/types';
import { useMemo, memo } from 'react';

// Fix for default icon path issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const getPolygonColor = (status: Field['hydrationStatus']) => {
  switch (status) {
    case 'Dehydrated':
      return '#f87171'; // red-400
    case 'Hydrated':
      return '#4ade80'; // green-400
    default:
      return '#60a5fa'; // blue-400
  }
};

const getCenter = (fields: Field[]): [number, number] => {
  if (fields.length === 0 || fields.every(f => f.polygon.length === 0)) {
    return [34.0522, -118.2437]; // Default to LA
  }
  const allCoords = fields.flatMap(f => f.polygon);
  if (allCoords.length === 0) {
    return [34.0522, -118.2437];
  }
  const lat = allCoords.reduce((sum, coord) => sum + coord.lat, 0) / allCoords.length;
  const lng = allCoords.reduce((sum, coord) => sum + coord.lng, 0) / allCoords.length;
  return [lat, lng];
};

type FieldMapProps = {
  fields: Field[];
  onFieldClick?: (field: Field) => void;
};

const FieldMapComponent = ({ fields, onFieldClick }: FieldMapProps) => {
  const center = useMemo(() => getCenter(fields), [fields]);
  
  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {fields.map((field) => {
        if (field.polygon.length === 0) return null;
        const polygonPositions: [number, number][] = field.polygon.map(p => [p.lat, p.lng]);
        const color = getPolygonColor(field.hydrationStatus);

        return (
          <Polygon
            key={field.id}
            positions={polygonPositions}
            pathOptions={{ color: color, fillColor: color, fillOpacity: 0.3 }}
            eventHandlers={{
              click: () => {
                onFieldClick?.(field);
              },
            }}
          />
        );
      })}
    </MapContainer>
  );
}

export const FieldMap = memo(FieldMapComponent);