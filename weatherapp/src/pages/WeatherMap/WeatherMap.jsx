import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { createPortal } from 'react-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './WeatherMap.scss';

// Иконка для маркера
const currentLocationIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Кнопка возврата на главную
const ButtonHomePage = ({ handleHomePage }) => {
  const map = useMap();
  const container = map.getContainer();
  
  return createPortal(
    <button 
      onClick={handleHomePage}
      className="map-control-button"
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        zIndex: 20001,
      }}
    >
      Готово
    </button>,
    container
  );
};

// Кнопка возврата к геопозиции (обновленная версия)
const ButtonCurrentLocation = ({ position }) => {
  const map = useMap();
  const container = map.getContainer();

  const handleClick = () => {
    map.flyTo(position, 13, {
      duration: 1,
      easeLinearity: 0.25
    });
  };

  return createPortal(
    <button
      onClick={handleClick}
      className="map-control-button"
      style={{
        position: 'fixed',
        top: '60px',
        left: '10px',
        zIndex: 20001,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </button>,
    container
  );
};

//===== ButtonFavoriteCities =====//
const ButtonFavoriteCities = () => {

}

const WeatherMap = ({ coords }) => {
  const [position, setPosition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (coords) {
      setPosition([coords.lat, coords.lon]);
    }
  }, [coords]);

  const handleHomePage = () => navigate('/');
  

  // Загрузка координат текущего местоположения
  if (!position) return <div>Loading map...</div>;

  return (
    <div className="WeatherMap">
      <MapContainer
        zoomControl={false}
        center={position}
        zoom={13}
        style={{ 
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 20000,
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        <Marker position={position} icon={currentLocationIcon}>
          <Popup>Ваше текущее местоположение</Popup>
        </Marker>

        <ButtonHomePage handleHomePage={handleHomePage} />
        <ButtonCurrentLocation position={position} />
      </MapContainer>
    </div>
  );
};

export default WeatherMap;