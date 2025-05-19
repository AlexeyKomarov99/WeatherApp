import React, {useState, useEffect} from 'react';
//===== assets =====//
import './ModalWindowFoundCity.scss';
//===== components =====//
import Modal from 'react-modal';
import WeatherCard from '../WeatherCard/WeatherCard';

const ModalWindowFoundCity = ({
  isActiveMW, 
  onClose, 
  currentWeatherData,
  hourlyForecastData,
  dailyForecastData
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if(isActiveMW) {
      setIsVisible(true);
    }
  }, [isActiveMW]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
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