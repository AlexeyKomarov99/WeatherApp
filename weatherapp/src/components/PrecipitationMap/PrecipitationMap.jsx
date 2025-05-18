import React, { useState, useEffect } from 'react';
import { useGetHourlyForecastQuery } from '../../features/weather/weatherApi';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaUmbrella as UmbrellaIcon } from "react-icons/fa";
import './PrecipitationMap.scss';

const PrecipitationMap = () => {
  const [position, setPosition] = useState([55.7558, 37.6173]);
  const { data: currentWeatherData, isLoading } = useGetHourlyForecastQuery('Moscow');

  const longitude = currentWeatherData?.location?.lon;
  const latitude = currentWeatherData?.location?.lat;

  useEffect(() => {
    if (!isLoading && longitude && latitude) {
      setPosition([latitude, longitude]);
    }
  }, [isLoading, longitude, latitude]);

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