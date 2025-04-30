import React, {useState, useEffect} from 'react';
//===== redux =====//
import { useGetHourlyForecastQuery } from '../../features/weather/weatherApi';
//===== assets =====//
import './PrecipitationMap.scss';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const PrecipitationMap = () => {
    const [position, setPosition] = useState([55.7558, 37.6173]);
    const [precipitationLayer, setPrecipitationLayer] = useState(null);
    const {
        data: currentWeatherData,
        isLoading: isCurrentWeatherLoading,
        error: curentWeatherError
    } = useGetHourlyForecastQuery('Moscow');

    const cityName = currentWeatherData?.location?.name;
    const longitude = currentWeatherData?.location?.lon;
    const latitude = currentWeatherData?.location?.lat;

    useEffect(() => {
        if (!isCurrentWeatherLoading && longitude && latitude) {
            setPosition([latitude, longitude]);

            // Создаем слой с осадками, если есть данные о прогнозе
            
        }
    }, [isCurrentWeatherLoading, longitude, latitude]);

    // console.log('Data for map:', currentWeatherData);

    return (
        <section className="PrecipitationMap">
            <div className="PrecipitationMap__header">Precipitation Map</div>
            <MapContainer
                cityName='PrecipitationMap__map'
                center={position}
                zoom={10}
                style={{ height: "220px", width: "100%" }}
            >
                <TileLayer 
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>{cityName}</Popup>
                </Marker>
            </MapContainer>
        </section>
    )
}

export default PrecipitationMap;