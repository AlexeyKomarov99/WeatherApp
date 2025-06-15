import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
import { selectFavoriteCities } from '../../../features/weather/weatherSelectors';
//===== assets =====//
import './MWFavoriteCities.scss';
import { FaUmbrella as UmbrellaIcon } from "react-icons/fa";
import { TbTemperature as TempNormIcon } from "react-icons/tb";
import { RxCross1 as CrossIcon } from "react-icons/rx";

const MWFavoriteCities = ({
  handleClose
}) => {

  const favoriteCities = useSelector(selectFavoriteCities);
  console.log(favoriteCities);

  return (
    <div className='MWFavoriteCities'>

      {/* Title */}
      <div className="MWFavoriteCities__header">
        <div className="MWFavoriteCities__icon-wrapper icon-wrapper"><UmbrellaIcon className='icon'/></div>

        <div className="MWFavoriteCities__title">Титул</div>
        <div className="MWFavoriteCities__title-descr">Описание</div>

        <div 
          className="MWFavoriteCities__cross-icon-wrapper"
          onClick={handleClose}
        >
          <CrossIcon className='cross-icon' />
        </div>

      </div>

    </div>
  )
}

export default MWFavoriteCities