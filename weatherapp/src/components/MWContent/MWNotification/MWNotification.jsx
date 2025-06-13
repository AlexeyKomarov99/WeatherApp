import React from 'react';
//===== assets =====//
import './MWNotification.scss';
import { FaBell as BellIcon } from "react-icons/fa";
import { FaHandshakeSimple as HandshakeIcon } from "react-icons/fa6";

const MWNotification = ({
    handleClose
}) => {
  return (
    <div className='MWNotification'>
        <div className="MWNotification__container">

            <div className="MWNotification__content-top">
                <div className="MWNotification__icon-wrapper">
                    <BellIcon className='icon-bell' />
                </div>

                <div className="MWNotification__title">
                    Допуск <br/> уведомлений
                </div>

                <div className="MWNotification__description">
                    Разрешите приложению "Погода" отправлять Вам уведомления. Вы также можете разрешить отправлять Вам важные предупреждения в случае экстремальных погодных условий.
                </div>
            </div>

            <div className="MWNotification__content-bottom">
                <div className="MWNotification__icon-wrapper">
                    <HandshakeIcon className='icon-handshake' />
                </div>
                <div className="MWNotification__description-bottom">
                    Ваша геопозиция, не связанная с Вашей личностью, будет отправляться в Apple, чтобы предотвратить Вам релевантный прогноз погоды. Если Вы включите уведомления об экстремальных погодных условиях, Apple может связать страну или регион, для которых Вы включили такие уведомления, с Вашим Apple ID.
                </div>
                <div 
                    className="MWNotification__description-link"
                    onClick={handleClose}
                >
                    Как осуществляется управление данными...
                </div>

                <div className="MWNotification__btn-group">
                    <div 
                        className="MWNotification__btn-continue"
                        onClick={handleClose}
                    >
                        Продолжить
                    </div>
                    <div 
                        className="MWNotification__btn-not-now"
                        onClick={handleClose}
                    >
                        Не сейчас
                    </div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default MWNotification;