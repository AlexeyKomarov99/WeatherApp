import React, {useState, useEffect, useRef} from 'react';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux';
//===== assets =====//
import './FavoritesCities.scss';
//===== components =====//
import SearchCity from '../../components/SearchCity/SearchCity';
import FavoritesCitiesCard from '../../components/FavoritesCitiesCard/FavoritesCitiesCard';

const favoritesCitiesList = [
  {id: 1, city: 'Москва', currentTime: '17:56', weatherDescr: 'Облачно', currentTemp: '7', maxTemp: '15', minTemp: '2'},
  {id: 2, city: 'Санкт-Петербург', currentTime: '17:56', weatherDescr: 'Дождь', currentTemp: '5', maxTemp: '10', minTemp: '1'},
  {id: 3, city: 'Краснодар', currentTime: '17:56', weatherDescr: 'Солнечно', currentTemp: '12', maxTemp: '20', minTemp: '9'},
  {id: 4, city: 'Новосибирск', currentTime: '17:56', weatherDescr: 'Снег', currentTemp: '-2', maxTemp: '3', minTemp: '-5'},
  {id: 5, city: 'Екатеринбург', currentTime: '17:56', weatherDescr: 'Метель', currentTemp: '-5', maxTemp: '0', minTemp: '-8'},
  {id: 6, city: 'Казань', currentTime: '17:56', weatherDescr: 'Облачно', currentTemp: '6', maxTemp: '12', minTemp: '3'},
  {id: 7, city: 'Уфа', currentTime: '17:56', weatherDescr: 'Дождь', currentTemp: '4', maxTemp: '9', minTemp: '0'},
  {id: 8, city: 'Владивосток', currentTime: '17:56', weatherDescr: 'Облачно', currentTemp: '10', maxTemp: '15', minTemp: '8'},
  {id: 9, city: 'Нижний Новгород', currentTime: '17:56', weatherDescr: 'Солнечно', currentTemp: '8', maxTemp: '14', minTemp: '5'},
  {id: 10, city: 'Челябинск', currentTime: '17:56', weatherDescr: 'Снег', currentTemp: '-3', maxTemp: '2', minTemp: '-6'},
];

const FavoritesCities = () => {
  const [blackout, setBlackout] = useState(false);
  const [isActiveMW, setIsActiveMW] = useState(false);

  useEffect(() => {
    if (blackout) {
      document.body.classList.add('page-blackout');
    } else {
      document.body.classList.remove('page-blackout');
    }
  }, [blackout]);

  return (
    <>
      {blackout && <div className="page-blackout" />}
      <div className="FavoritesCities">
        <div
          className={`FavoritesCities__title ${blackout ? 'hide-title' : ''}`}
        >
          Погода
        </div>
        <SearchCity 
          blackout={blackout} 
          setBlackout={setBlackout} 
          isActiveMW={isActiveMW}
          setIsActiveMW={setIsActiveMW}
        />
        <div className={`FavoritesCities__content ${blackout ? 'content-up' : ''}`}>
          {favoritesCitiesList.length !== 0 ? (
            favoritesCitiesList.map((city) => (
            <FavoritesCitiesCard key={city.id} city={city} />
          ))
          ) : (
            <div className="FavoritesCities__content-footer">
              Пусто
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default FavoritesCities;