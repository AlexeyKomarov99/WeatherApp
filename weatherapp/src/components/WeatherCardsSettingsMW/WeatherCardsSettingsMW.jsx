import React from 'react';
//===== assets =====//
import './WeatherCardsSettingsMW.scss';
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
    openSettingsMW,
    iconPosition,
    toggleActiveSection,
}) => {

    const modalStyle = {
        position: 'absolute',
        top: `${iconPosition.top}px`,
        right: `${Math.min(iconPosition.right + 20, window.innerWidth - 20)}px`,
        left: `${iconPosition.left}px`,
        transform: 'translateX(-90%)',
    };

    const handleClose = () => {
        openSettingsMW()
    }

    
    const handleSelectAction = (action) => {
        if(action === 'Изменить список') {
            console.log('change list')
        } else if (action === 'Уведомления') {
            toggleActiveSection('Notification')
        } else if (action === 'Градусы Цельсия') {
            console.log('celsiy')
        } else if (action === 'Градусы Фаренгейта') {
            console.log('farengeyt')
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
            closeTimeoutMS={300}
            style={{ content: modalStyle }}
        >
            <div className="WeatherCardsSettingsMW__container">    
                {contentData.map((item, index) => (
                    <div 
                        key={item.id} 
                        className="WeatherCardsSettingsMW__content"
                        onClick={() => handleSelectAction(item.action)}
                    >
                        <div className="WeatherCardsSettingsMW__left"></div>
                        <div className="WeatherCardsSettingsMW__title">{item.title}</div>
                        <div className="WeatherCardsSettingsMW__icon-wrapper">{item.icon}</div> 
                    </div>
                ))}
            </div>
        </Modal>
    )
}

export default WeatherCardsSettingsMW;