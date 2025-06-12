import React, { useState, useEffect } from 'react';
import { useGetHourlyForecastQuery } from '../../features/weather/weatherApi';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaUmbrella as UmbrellaIcon } from "react-icons/fa";
import './PrecipitationMap.scss';

const PrecipitationMap = ({currentWeatherData}) => {
  const [position, setPosition] = useState(null); // Значение по умолчанию

  useEffect(() => {
    if (currentWeatherData?.location?.lat && currentWeatherData?.location?.lon) {
      const newLat = currentWeatherData.location.lat;
      const newLon = currentWeatherData.location.lon;
      setPosition([newLat, newLon]);
    }
  }, [currentWeatherData?.location?.lat, currentWeatherData?.location?.lon]);

  if (!position) {
    return <div className="PrecipitationMap">Загрузка карты...</div>;
  }
  
  return (
    <section className="PrecipitationMap">
      <div className="PrecipitationMap__header">
        <span className="Precipitation__wrapper icon-wrapper">
          <UmbrellaIcon />
        </span>
        <span className="Precipitation__name">Осадки</span>
      </div>
      <div className="PrecipitationMap__map-wrapper">
        <MapContainer
          center={position}
          zoom={10}
          style={{ height: "220px", width: "100%" }}
          zoomControl={false}
          key={`${position[0]}-${position[1]}`} // Добавляем key для принудительного пересоздания карты при изменении позиции
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution=""  // Оставляем пустым или удаляем строку полностью
          />
        </MapContainer>
      </div>
    </section>
  );
};

export default PrecipitationMap;