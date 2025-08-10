import {
  MapContainer,
  TileLayer,
  Rectangle,
  useMapEvent,
} from 'react-leaflet';
import { LatLng, LatLngBounds, latLngBounds } from 'leaflet';
import { useState } from 'react';

interface Props {
  onSelect: (bounds: LatLngBounds) => void;
  selectedBounds: LatLngBounds | null;
}

function MapEvents({ onSelect }: { onSelect: (b: LatLngBounds) => void }) {
  const [start, setStart] = useState<LatLng | null>(null);

  useMapEvent('mousedown', (e) => {
    setStart(e.latlng);
  });

  useMapEvent('mouseup', (e) => {
    if (!start) return;
    const bounds = latLngBounds(start, e.latlng);
    onSelect(bounds);
    setStart(null);
  });

  return null;
}

export default function MapComponent({ selectedBounds, onSelect }: Props) {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '100vh', width: '100vw' }}
      scrollWheelZoom
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MapEvents onSelect={onSelect} />
      {selectedBounds && (
        <Rectangle
          bounds={selectedBounds}
          pathOptions={{ color: 'blue' }}
          interactive={false} 
        />
      )}
    </MapContainer>
  );
}
