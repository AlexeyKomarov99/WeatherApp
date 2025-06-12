import React, {useEffect, useRef} from 'react';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFavoriteCities,
  selectCurrentIndex,
  selectCitiesWeatherData,
} from '../../features/weather/weatherSelectors';
import {
  setCurrentIndex
} from '../../features/weather/weatherSlice';
//===== assets =====//
import './HomePage.scss';
//===== components =====//
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import Swiper from 'swiper';
import 'swiper/css';

const HomePage = ({
  currentWeatherData, 
  hourlyForecastData, 
  dailyForecastData
}) => {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const currentIndex = useSelector(selectCurrentIndex);
  const citiesWeatherData = useSelector(selectCitiesWeatherData) || [];

  // Инициализация Swiper
  useEffect(() => {
    if (!swiperRef.current) {
      swiperRef.current = new Swiper('.swiper-container', {
        initialSlide: currentIndex,
        speed: 300,
        resistanceRatio: 0.7,
        on: {
          slideChange: () => {
            dispatch(setCurrentIndex(swiperRef.current.activeIndex));
          },
        },
      });
    }

    return () => {
      if (swiperRef.current) swiperRef.current.destroy();
    };
  }, []);

  // Обновляем Swiper при изменении данных
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
      swiperRef.current.slideTo(currentIndex);
    }
  }, [currentIndex, citiesWeatherData]);
  
  return (
    <div className="HomePage">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {/* Слайд с текущей геопозицией */}
          <div className="swiper-slide">
            <WeatherCard
              currentWeatherData={currentWeatherData}
              hourlyForecastData={hourlyForecastData}
              dailyForecastData={dailyForecastData}
              isCurrentLocation={true}
            />
          </div>

          {/* Слайды избранных городов */}
          {citiesWeatherData.map((city) => (
            <div className="swiper-slide" key={city.cityId}>
              <WeatherCard
                currentWeatherData={city.cityData.currentWeatherData}
                hourlyForecastData={city.cityData.hourlyForecastData}
                dailyForecastData={city.cityData.dailyForecastData}
                isFavorite={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;