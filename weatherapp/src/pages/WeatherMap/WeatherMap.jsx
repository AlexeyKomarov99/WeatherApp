import React, { useState, useEffect, useRef, useMemo } from 'react';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsActiveMW,
  selectActiveSectionName,
  selectFavoriteCities,
} from '../../features/weather/weatherSelectors';
import {
  setIsActiveMW,
  setActiveSectionName
} from '../../features/weather/weatherSlice';
//===== react-router =====//
import { useNavigate } from 'react-router-dom';
//===== components
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { createPortal } from 'react-dom';
import L from 'leaflet';
//===== assets =====//
import 'leaflet/dist/leaflet.css';
import './WeatherMap.scss';
import { FaLocationArrow as ArrowIcon } from "react-icons/fa6";
import { IoIosList as ListIcon } from "react-icons/io";
import { PiCards as CardsIcon } from "react-icons/pi";
import { FaUmbrella as UmbrellaIcon } from "react-icons/fa";
import { TbTemperature as TempNormIcon } from "react-icons/tb";
import { IoCheckmarkOutline as CheckIcon } from "react-icons/io5";

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

// Кнопка возврата на главную страницу
const ButtonHomePage = ({ handleHomePage }) => {
  const map = useMap();
  const container = map.getContainer();
  
  return createPortal(
    <div 
      onClick={handleHomePage}
      style={{
        position: 'fixed',
        top: '3%',
        left: '3%',
        zIndex: 1000,
        height: '48px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        padding: '4px 12px',
        fontSize: '18px',
        backgroundColor: '#ededed',
        color: '#000',
        boxShadow: '1px 2px 5px rgba(0,0,0,0.3)',
        cursor: 'pointer',
      }}
    >
      Готово
    </div>,
    container
  );
};

// Кнопка возврата к геопозиции (обновленная версия)
const ButtonFavoriteCities = ({ currentPosition, handleTest }) => {
  const map = useMap();
  const container = map.getContainer();

  const handleClick = () => {
    map.flyTo(currentPosition, 13, {
      duration: 1,
      easeLinearity: 0.25
    });
  };

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: '3%',
        right: '3%',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        backgroundColor: '#ededed',
        boxShadow: '1px 2px 5px rgba(0,0,0,0.3)',
      }}
    >
      {/* Arrow */}
      <div
        onClick={handleClick}
        style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          borderBottom: '1px solid darkgray',
        }}
      >
        <ArrowIcon
          style={{
            width: '32px',
            height: '32px',
            color: '000',
          }}
        />
      </div>

      {/* List cities */}
      <div
        onClick={handleTest}
        style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <ListIcon 
          style={{
            width: '32px',
            height: '32px',
            color: '000',
          }}
        />
      </div>

    </div>,
    container
    
  );
};

// Окно с текущей информацией о погоде
const WindowWeatherData = () => {
  const map = useMap();
  const container = map.getContainer();

  return createPortal(
    <div
      style={{

      }}
    >
      <div>

      </div>
      <div>
        
      </div>
    </div>,
    container
  )
}

const ButtonWeatherSection = React.forwardRef(({ openWeatherSectionMW }, ref) => {
  const map = useMap();
  const container = map.getContainer();

  return createPortal(
    <div
      ref={ref}
      onClick={() => openWeatherSectionMW()}
      style={{
          position: 'fixed',
          top: '17%',
          right: '3%',
          zIndex: 1000,
          width: '48px',
          height: '48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
          backgroundColor: '#ededed',
          boxShadow: '1px 2px 5px rgba(0,0,0,0.3)',
          cursor: 'pointer',
      }}
    >
      <CardsIcon 
        style={{
          width: '32px',
          height: '32px',
          color: '000',
        }}
      />
    </div>,
    container
    
  );
});

const weatherSectionData = [
  {id: 1, title: 'Осадки', sectionIcon: <UmbrellaIcon style={{color: '000', marginRight: '16px', width: '24px', height: '24px'}} />, checkIcon: <CheckIcon />},
  {id: 2, title: 'Температура', sectionIcon: <TempNormIcon style={{color: '000', marginRight: '16px', width: '24px', height: '24px'}}/>, checkIcon: <CheckIcon />},
]

const WeatherSectionMW = React.forwardRef(({ isWeatherSectionMW }, ref) => {
  const map = useMap();
  const container = map.getContainer();
  
  return createPortal(
    <div
      ref={ref}
      style={{
        display: isWeatherSectionMW ? 'block' : 'none',
        position: 'fixed',
        top: '25%', // Изменено положение, чтобы было рядом с кнопкой
        right: '35px', // Отступ от правого края
        width: '200px',
        borderRadius: '8px',
        zIndex: 1000,
        backgroundColor: '#ededed',
        boxShadow: '1px 2px 5px rgba(0,0,0,0.3)',
      }}
    >
      {weatherSectionData.map((item) => (
          <div 
            key={item.id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid darkgray',
              cursor: 'pointer'
            }}
          >
            <div 
              style={{
                color: '#000',
                fontSize: '18px',
                padding: '6px 0px',
                marginLeft: '16px',
              }}
            >
              {item.title}
            </div>
            <div>
              {item.sectionIcon}
            </div>
          </div>
        ))}
    </div>,
    container
  );
});

const WeatherMap = ({ coords }) => {
  const [isWeatherSectionMW, setIsWeatherSectionMW] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const isActiveMW = useSelector(selectIsActiveMW);
  const activeSectionName = useSelector(selectActiveSectionName);
  const favoriteCities = useSelector(selectFavoriteCities);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const weatherSectionRef = useRef(null);
  const buttonWeatherSectionRef = useRef(null);

  const myFavoriteCities = useMemo(() => {
    return favoriteCities.map(city => {
      return {
        cityId: city.cityId,
        cityName: city.cityName,
        coords: [city.lat, city.lon],
        currentTemp_c: city.currentTemp_c,
        currentTemp_f: city.currentTemp_f,
        maxTemp_c: city.maxTemp_c,
        maxTemp_f: city.maxTemp_f,
        minTemp_c: city.minTemp_c,
        minTemp_f: city.minTemp_f,
      }
    })
  }, [favoriteCities]);

  const openWeatherSectionMW = () => {
    setIsWeatherSectionMW(prevState => !prevState);
  }

  const handleHomePage = () => navigate('/');

  const handleTest = () => {
    dispatch(setIsActiveMW(true));
    dispatch(setActiveSectionName('FavoriteCities'));
  }

  const handleCloseMW = () => {
    dispatch(setIsActiveMW(false));
    dispatch(setActiveSectionName(''));
  }

  useEffect(() => {
    if (coords) {
      setCurrentPosition([coords.lat, coords.lon]);
    }
  }, [coords]);

  // Закрытие модального окна при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Проверяем, что клик был не по модальному окну и не по кнопке
      if (weatherSectionRef.current && 
          !weatherSectionRef.current.contains(event.target) &&
          buttonWeatherSectionRef.current &&
          !buttonWeatherSectionRef.current.contains(event.target)) {
        setIsWeatherSectionMW(false);
      }
    };

    if (isWeatherSectionMW) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWeatherSectionMW]);

  // Загрузка координат текущего местоположения
  if (!currentPosition) return <div>Loading map...</div>;

  return (
    <div className="WeatherMap">
      <MapContainer
        zoomControl={false}
        center={currentPosition}
        zoom={13}
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          height: '100vh',
          width: '100vw',
          zIndex: '10'
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        <Marker position={currentPosition} icon={currentLocationIcon}>
          <Popup>Ваше текущее местоположение</Popup>
        </Marker>

        {/* Список избранных городов */}
        {myFavoriteCities.map((city) => (
          <Marker key={city.cityId} position={city.coords} icon={currentLocationIcon}>
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}

        <ButtonHomePage handleHomePage={handleHomePage} />
        <ButtonFavoriteCities currentPosition={currentPosition} handleTest={handleTest} />
        
        <ButtonWeatherSection 
          openWeatherSectionMW={openWeatherSectionMW} 
          ref={buttonWeatherSectionRef}
        />
        <WeatherSectionMW 
          isWeatherSectionMW={isWeatherSectionMW} 
          ref={weatherSectionRef}  
        />

      </MapContainer>

      <ModalWindow 
        isActiveMW={isActiveMW}
        activeSectionName={activeSectionName}
        handleCloseMW={handleCloseMW}
      />

    </div>
  );
};

export default WeatherMap;