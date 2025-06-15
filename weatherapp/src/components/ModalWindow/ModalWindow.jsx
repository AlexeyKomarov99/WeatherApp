import React from 'react';
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
import MWFavoriteCities from '../MWContent/MWFavoriteCities/MWFavoriteCities';

Modal.setAppElement('#root');

const ModalWindow = ({
    isActiveMW, 
    activeSectionName, 
    handleCloseMW, 
    hourlyForecastData, 
    dailyForecastData,
    selectedDateIndex, 
    setSelectedDateIndex
}) => {

    const dailyWeatherData = dailyForecastData?.forecast?.forecastday;
    const hourlyWeatherData = hourlyForecastData?.forecast?.forecastday[0].astro;

    return (
        <Modal 
            isOpen={isActiveMW}
            onRequestClose={handleCloseMW}
            className="ModalWindow"
            overlayClassName="OverlayModalWindow"
            closeTimeoutMS={300}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
        >
            <div className="ModalWindow__content">
                {activeSectionName === 'Hourly Forecast' && <MWDailyForecast dailyWeatherData={dailyWeatherData} />}
                {activeSectionName === 'Daily Forecast' && <MWDailyForecast dailyWeatherData={dailyWeatherData} selectedDateIndex={selectedDateIndex} setSelectedDateIndex={setSelectedDateIndex} handleCloseMW={handleCloseMW}/>}
                {activeSectionName === 'UV Index' && <MWUVIndex dailyWeatherData={dailyWeatherData} handleCloseMW={handleCloseMW} />}
                {activeSectionName === 'Sunset' && <MWSunset hourlyWeatherData={hourlyWeatherData} handleCloseMW={handleCloseMW} />}
                {activeSectionName === 'Wind' && <MWWind dailyWeatherData={dailyWeatherData} handleCloseMW={handleCloseMW} />}
                {activeSectionName === 'Precipitation' && <MWPrecipitation dailyWeatherData={dailyWeatherData} handleCloseMW={handleCloseMW} />}
                {activeSectionName === 'Feels Like' && <MWFeelsLike dailyWeatherData={dailyWeatherData} handleCloseMW={handleCloseMW} />}
                {activeSectionName === 'Humidity' && <MWHumidity dailyWeatherData={dailyWeatherData} handleCloseMW={handleCloseMW} />}
                {activeSectionName === 'Visibility' && <MWVisibility dailyWeatherData={dailyWeatherData} handleCloseMW={handleCloseMW} />}
                {activeSectionName === 'Pressure' && <MWPressure dailyWeatherData={dailyWeatherData} handleCloseMW={handleCloseMW} />}
                {activeSectionName === 'Report Problem' && <MWReportProblem handleCloseMW={handleCloseMW} />}
                {activeSectionName === 'Notification' && <MWNotification handleCloseMW={handleCloseMW} />}
                {activeSectionName === 'FavoriteCities' && <MWFavoriteCities handleCloseMW={handleCloseMW} />}
            </div>
        </Modal>
    )
}

export default ModalWindow;