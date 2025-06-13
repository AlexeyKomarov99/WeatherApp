import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux';
import { selectFavoriteCities } from '../../features/weather/weatherSelectors';
import { setCurrentIndex } from '../../features/weather/weatherSlice';
//===== assets =====//
import './FavoritesCities.scss';
//===== components =====//
import SearchCity from '../../components/SearchCity/SearchCity';
import FavoritesCitiesCard from '../../components/FavoritesCitiesCard/FavoritesCitiesCard';

const FavoritesCities = ({
  currentWeatherData,
  hourlyForecastData
}) => {
  const [blackout, setBlackout] = useState(false);
  const [isActiveMW, setIsActiveMW] = useState(false);
  const favoritesCitiesList = useSelector(selectFavoriteCities);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hourlyWeatherData = hourlyForecastData?.forecast?.forecastday;
  const hourlyData = hourlyWeatherData 
    ? hourlyWeatherData[0].hour.map(hour => Math.round(hour.temp_c))
    : [];
  
  const nameCity = 'Текущее место';
  const currentTime = currentWeatherData?.location?.localtime.split(' ')[1];
  const minTemp = Math.min(...hourlyData);
  const maxTemp = Math.max(...hourlyData);
  const currentTemp = currentWeatherData?.current?.temp_c || '';
  const weatherDescr = currentWeatherData ? currentWeatherData?.current?.condition?.text : '-';

  const weatherDataCurrentCity = {
    cityName: nameCity,
    currentTemp: currentTemp,
    currentTime: currentTime,
    minTemp: minTemp,
    maxTemp: maxTemp,
    weatherDescr: weatherDescr
  };

  const goActivePage = (index) => {
    console.log('Индекс карточки избр городов:', index);
    dispatch(setCurrentIndex(index));
    navigate('/');
  }

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
          {/* Карточка текущего местоположения - всегда с индексом 0 */}
          <FavoritesCitiesCard 
            city={weatherDataCurrentCity}
            onClick={() => goActivePage(0)}
          />

          {/* Карточки избранных городов с индексами, начиная с 1 */}
          {favoritesCitiesList.map((city, index) => (
            <FavoritesCitiesCard 
              key={city.cityId} 
              city={city} 
              onClick={() => goActivePage(index + 1)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritesCities;