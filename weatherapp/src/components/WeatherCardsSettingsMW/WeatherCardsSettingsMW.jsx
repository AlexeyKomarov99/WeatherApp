import React from 'react';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux';
import { setTemperatureUnits } from '../../features/weather/weatherSlice';
import { selectTemperatureUnits } from '../../features/weather/weatherSelectors';
//===== assets =====//
import './WeatherCardsSettingsMW.scss';
import { FaCheck as CheckIcon } from "react-icons/fa6";
import { GoPencil as PencilIcon } from "react-icons/go";
import { GoBell as BellIcon } from "react-icons/go";
import { TbAlertHexagonFilled as AlertIcon } from "react-icons/tb";
//===== components =====//
import Modal from 'react-modal';

const contentData = [
    {id: 1, title: 'Изменить список', icon: <PencilIcon className='' />, action: 'Изменить список'},
    {id: 2, title: 'Уведомления', icon: <BellIcon className='' />, action: 'Уведомления'},
    {id: 3, title: 'Градусы Цельсия', icon: '°C', action: 'Градусы Цельсия'},
    {id: 4, title: 'Градусы Фаренгейта', icon: '°F', action: 'Градусы Фаренгейта'},
    {id: 5, title: <>Сообщить о<br />проблеме</>, icon: <AlertIcon className='' />, action: 'Сообщить о проблеме'}
]

const WeatherCardsSettingsMW = ({
    isActiveSetingsMW,
    setIsActiveSettingsMW,
    openSettingsMW,
    iconPosition,
    toggleActiveSection,
    onToggleEditMode,
    isEditMode,
}) => {
    const dispatch = useDispatch();
    const temperatureUnits = useSelector(selectTemperatureUnits) || 'Celsius';

    const modalStyle = {
        position: 'absolute',
        top: `${iconPosition.top}px`,
        right: `${Math.min(iconPosition.right + 20, window.innerWidth - 20)}px`,
        left: `${iconPosition.left}px`,
        transform: 'translateX(-90%)',
    };

    const handleClose = () => {
        openSettingsMW();
    }

    const handleSelectAction = (action) => {
        if(action === 'Изменить список') {
            onToggleEditMode();
            setIsActiveSettingsMW(false);
        } else if (action === 'Уведомления') {
            toggleActiveSection('Notification');
        } else if (action === 'Градусы Цельсия') {
            dispatch(setTemperatureUnits('Celsius'));
            setIsActiveSettingsMW();
        } else if (action === 'Градусы Фаренгейта') {
            dispatch(setTemperatureUnits('Fahrenheit'));
            setIsActiveSettingsMW();
        } else if (action === 'Сообщить о проблеме') {
            toggleActiveSection('Report Problem');
        } return null;
    }

    return (
        <Modal 
            className={`WeatherCardsSettingsMW`}
            overlayClassName={'OverlayModalWindow'}
            isOpen={isActiveSetingsMW}
            onRequestClose={handleClose}
            style={{ content: modalStyle }}
        >
            <div className="WeatherCardsSettingsMW__container">    
                {contentData.map((item) => (
                    <div 
                        key={item.id} 
                        className="WeatherCardsSettingsMW__content"
                        onClick={() => handleSelectAction(item.action)}
                    >
                        <div className="WeatherCardsSettingsMW__left">
                            {/* Показываем CheckIcon только для выбранной единицы измерения */}
                            {(item.action === 'Градусы Цельсия' && temperatureUnits === 'Celsius') && 
                                <CheckIcon className='check-icon' />}
                            {(item.action === 'Градусы Фаренгейта' && temperatureUnits === 'Fahrenheit') && 
                                <CheckIcon className='check-icon' />}
                        </div>
                        <div className="WeatherCardsSettingsMW__title">{item.title}</div>
                        <div className="WeatherCardsSettingsMW__icon-wrapper">{item.icon}</div> 
                    </div>
                ))}
            </div>
        </Modal>
    )
}

export default WeatherCardsSettingsMW;