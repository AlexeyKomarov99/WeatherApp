import React, {useState, useEffect} from 'react';
//===== redux =====//
import { useDispatch } from 'react-redux';
import { addCityFavorites } from '../../features/weather/weatherSlice';
//===== assets =====//
import './ModalWindowFoundCity.scss';
//===== components =====//
import Modal from 'react-modal';
import WeatherCard from '../WeatherCard/WeatherCard';

const ModalWindowFoundCity = ({
  selectedCity,
  setSelectedCity,
  setCoords,
  setSearchTerm,
  setSuggestions,
  isActiveMW, 
  onClose, 
  currentWeatherData,
  hourlyForecastData,
  dailyForecastData
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const hourlyWeatherData = hourlyForecastData 
    ? hourlyForecastData?.forecast?.forecastday[0]?.hour?.map(hour => hour.temp_c) 
    : [];  
  let currentTemp = Math.round(currentWeatherData?.current?.temp_c);
  let minTemp = Math.round(Math.min(...hourlyWeatherData));
  let maxTemp = Math.round(Math.max(...hourlyWeatherData));
  let is_day = currentWeatherData?.current?.is_day

  useEffect(() => {
    if(isActiveMW) {
      setIsVisible(true);
    }
  }, [isActiveMW]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }

  const handleAddCity = () => {
    if(currentWeatherData) {
      dispatch(addCityFavorites(
        selectedCity.id,
        currentWeatherData.location.lat,
        currentWeatherData.location.lon,
        selectedCity.cityName,
        selectedCity.region,
        selectedCity.country,
        currentWeatherData.location.localtime.split(' ')[1],
        currentWeatherData.current.condition.text,
        currentTemp,
        minTemp,
        maxTemp,
        is_day
      ));

      // Сброс состояний
      handleClose();
      setSelectedCity({});
      setCoords(null);
      setSearchTerm('');
      // setSuggestions([]);
    }
  }

  return (
    <Modal
      className={`ModalWindowFoundCity ${isVisible ? 'openWindow' : ''}`}
      overlayClassName={`OverlayModalWindowFoundCity`}
      isOpen={isActiveMW}
      onRequestClose={handleClose}
      closeTimeoutMS={300}
    >
      <div className="ModalWindowFoundCity__content">
        <div className="ModalWindowFoundCity__settings">
          <div 
            className="ModalWindowFoundCity__cancle"
            onClick={handleClose}
          >
            Отмена
          </div>
          <div 
            className="ModalWindowFoundCity__add"
            onClick={handleAddCity}
          >Добавить</div>
        </div>
        <WeatherCard 
          currentWeatherData={currentWeatherData}
          hourlyForecastData={hourlyForecastData}
          dailyForecastData={dailyForecastData}
        />
      </div>
    </Modal>
  )
}

export default ModalWindowFoundCity;