import React, {useState, useEffect} from 'react';
//===== redux =====//
import {
    useGetHourlyForecastQuery,
    useGetDailyForecstQuery
  } from '../../features/weather/weatherApi';
//===== assets =====//
import './ModalWindow.scss';
//===== components =====//
import Modal from 'react-modal';
import MWHourlyForecast from '../MWContent/MWHourlyForecast/MWHourlyForecast';
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

Modal.setAppElement('#root');

const ModalWindow = ({isActiveMW, activeSection, onClose}) => {

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

    const {
        data: hourlyForecastData,
        isLoading: isHourlyForecastLoading,
        error: hourlyForecastLoading
    } = useGetHourlyForecastQuery('Moscow');

    const {
        data: dailyForecastData,
        isLoading: isDailyForecastLoading,
        error: dailyForecastLoading
    } = useGetDailyForecstQuery('Moscow');

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
                {activeSection === 'Hourly Forecast' && <MWHourlyForecast />}
                {activeSection === 'Daily Forecast' && <MWDailyForecast />}
                {activeSection === 'UV Index' && <MWUVIndex dailyWeatherData={dailyWeatherData} />}
                {activeSection === 'Sunset' && <MWSunset hourlyWeatherData={hourlyWeatherData} />}
                {activeSection === 'Wind' && <MWWind dailyWeatherData={dailyWeatherData} />}
                {activeSection === 'Precipitation' && <MWPrecipitation dailyWeatherData={dailyWeatherData} />}
                {activeSection === 'Feels Like' && <MWFeelsLike dailyWeatherData={dailyWeatherData} />}
                {activeSection === 'Humidity' && <MWHumidity dailyWeatherData={dailyWeatherData} />}
                {activeSection === 'Visibility' && <MWVisibility dailyWeatherData={dailyWeatherData} />}
                {activeSection === 'Pressure' && <MWPressure dailyWeatherData={dailyWeatherData} />}
                {activeSection === 'Report Problem' && <MWReportProblem onClose={onClose} />}
                
            </div>
        </Modal>
    )
}

export default ModalWindow;