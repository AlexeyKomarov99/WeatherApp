import React, {useState, useEffect, useRef} from 'react';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux';
import { selectFavoriteCities } from '../../features/weather/weatherSelectors';
//===== assets =====//
import './FavoritesCities.scss';
//===== components =====//
import SearchCity from '../../components/SearchCity/SearchCity';
import FavoritesCitiesCard from '../../components/FavoritesCitiesCard/FavoritesCitiesCard';

const FavoritesCities = () => {
  const [blackout, setBlackout] = useState(false);
  const [isActiveMW, setIsActiveMW] = useState(false);

  const favoritesCitiesList = useSelector(selectFavoriteCities);
  console.log(favoritesCitiesList);

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
            <FavoritesCitiesCard key={city.cityId} city={city} />
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