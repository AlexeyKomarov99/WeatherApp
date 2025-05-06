import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
//===== assets =====//
import './ModalWindow.scss';

//===== components =====//
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
                {activeSection === 'UV Index' && <MWUVIndex />}
                {activeSection === 'Sunset' && <MWSunset />}
                {activeSection === 'Wind' && <MWWind />}
                {activeSection === 'Precipitation' && <MWPrecipitation />}
                {activeSection === 'Feels Like' && <MWFeelsLike />}
                {activeSection === 'Humidity' && <MWHumidity />}
                {activeSection === 'Visibility' && <MWVisibility />}
                {activeSection === 'Pressure' && <MWPressure />}
                {activeSection === 'Report Problem' && <MWReportProblem />}
            </div>
        </Modal>
    )
}

export default ModalWindow;