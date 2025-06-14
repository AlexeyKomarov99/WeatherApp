import React, {useState, useEffect} from 'react';
//===== assets =====//
import './ModalWindow.scss';
//===== components =====//
import Modal from 'react-modal';
import MWDailyForecast from '../MWContent/MWDailyForecast/MWDailyForecast';
import MWUVIndex from '../MWContent/MWUVIndex/MWUVIndex';
import MWSunset from '../MWContent/MWSunset/MWSunset';
import MWWind from '../MWContent/MWWind/MWWind';
import MWPrecipitation from '../MWContent/MWPrecipitation/MWPrecipitation';
import MWFeelsLike from '../MWContent/MWFeelsLike/MWFeelsLike';
import MWHumidity from '../MWContent/MWHumidity/MWHumidity';
import MWVisibility from '../MWContent/MWVisibility/MWVisibility';
import MWPressure from '../MWContent/MWPressure/MWPressure';
import MWReportProblem from '../MWContent/MWReportProblem/MWReportProblem';
import MWNotification from '../MWContent/MWNotification/MWNotification';

Modal.setAppElement('#root');

const ModalWindow = ({
    isActiveMW, 
    activeSection, 
    onClose, 
    currentWeatherData, 
    hourlyForecastData, 
    dailyForecastData,
    selectedDateIndex, // Для компонента MWDailyForecast
    setSelectedDateIndex // Для компонента MWDailyForecast
}) => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if(isActiveMW) {
            setIsVisible(true)
        }
    }, [isActiveMW]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    }

    const dailyWeatherData = dailyForecastData?.forecast?.forecastday;
    const hourlyWeatherData = hourlyForecastData?.forecast?.forecastday[0].astro;

    return (
        <Modal 
            className={`ModalWindow ${isVisible ? 'openWindow' : ''}`}
            overlayClassName={'OverlayModalWindow'}
            isOpen={isVisible}
            onRequestClose={handleClose}
            closeTimeoutMS={300}
        >
            <div className="ModalWindow__content">
                {activeSection === 'Hourly Forecast' && <MWDailyForecast dailyWeatherData={dailyWeatherData} />}
                {activeSection === 'Daily Forecast' && <MWDailyForecast dailyWeatherData={dailyWeatherData} selectedDateIndex={selectedDateIndex} setSelectedDateIndex={setSelectedDateIndex} handleClose={handleClose}/>}
                {activeSection === 'UV Index' && <MWUVIndex dailyWeatherData={dailyWeatherData} handleClose={handleClose} />}
                {activeSection === 'Sunset' && <MWSunset hourlyWeatherData={hourlyWeatherData} handleClose={handleClose} />}
                {activeSection === 'Wind' && <MWWind dailyWeatherData={dailyWeatherData} handleClose={handleClose} />}
                {activeSection === 'Precipitation' && <MWPrecipitation dailyWeatherData={dailyWeatherData} handleClose={handleClose} />}
                {activeSection === 'Feels Like' && <MWFeelsLike dailyWeatherData={dailyWeatherData} handleClose={handleClose} />}
                {activeSection === 'Humidity' && <MWHumidity dailyWeatherData={dailyWeatherData} handleClose={handleClose} />}
                {activeSection === 'Visibility' && <MWVisibility dailyWeatherData={dailyWeatherData} handleClose={handleClose} />}
                {activeSection === 'Pressure' && <MWPressure dailyWeatherData={dailyWeatherData} handleClose={handleClose} />}
                {activeSection === 'Report Problem' && <MWReportProblem handleClose={handleClose} />}
                {activeSection === 'Notification' && <MWNotification handleClose={handleClose} />}
            </div>
        </Modal>
    )
}

export default ModalWindow;