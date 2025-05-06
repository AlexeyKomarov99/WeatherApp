import React from 'react';
//===== assets =====//
import './ReportProblem.scss';
import { TbAlertHexagonFilled as AlertIcon } from "react-icons/tb";

const ReportProblem = ({onClick}) => {
  return (
    <section 
      className='ReportProblem'
      onClick={onClick}
    >
      <div className="ReportProblem__icon-wrapper icon-wrapper">
        <AlertIcon className='ReportProblem__icon icon' />
      </div>
      <div className="ReportProblem__content">
        <div className="ReportProblem__title">Сообщить о проблеме</div>
        <div className="ReportProblem__descr">
          Вы можете описать текущие погодные условия в своей геопозици, чтобы помочь улучшить точность прогнозов.
        </div>
      </div>
    </section>
  )
}

export default ReportProblem;