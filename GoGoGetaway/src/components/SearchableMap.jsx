import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Define a separate component that uses useMap
const MapEffect = ({ searchAddress }) => {
  const map = useMap();

  useEffect(() => {
    if (searchAddress && searchAddress.trim() !== '') {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchAddress}`,
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            map.setView([lat, lon], 13); // Update the map's view to the new location
          } else {
            alert('Location not found');
          }
        })
        .catch(() => alert('Error occurred while searching for location'));
    }
  }, [searchAddress, map]);

  return null; // This component does not render anything itself
};

const SearchableMap = ({ searchAddress }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]} // Initial position
      zoom={13} // Initial zoom level
      //   style={{ height: '100vh', width: '100%' }}
      className="z-0 h-[35rem] w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Use the MapEffect component inside MapContainer */}
      <MapEffect searchAddress={searchAddress} />
    </MapContainer>
  );
};

export default SearchableMap;
