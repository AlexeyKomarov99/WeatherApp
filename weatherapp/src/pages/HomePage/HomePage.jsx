import {useState, useEffect, useRef, useMemo, useCallback} from 'react';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCitiesWeatherData,
  selectIndexActivePage,
} from '../../features/weather/weatherSelectors';
import { setIndexActivePage } from '../../features/weather/weatherSlice';
//===== assets =====//
import './HomePage.scss';
import 'swiper/css';
//===== components =====//
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import Swiper from 'swiper';
//===== utils =====//
import { getBackgroundByWeather } from '../../utils/getBackgroundByWeather';

const HomePage = ({
  currentWeatherData, 
  hourlyForecastData, 
  dailyForecastData,
  setCurrentBackground,
}) => {
  const dispatch = useDispatch();
  const indexActivePage = useSelector(selectIndexActivePage);
  const swiperRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const rawCitiesWeatherData = useSelector(selectCitiesWeatherData);
  const citiesWeatherData = useMemo(() => rawCitiesWeatherData || [], [rawCitiesWeatherData]);

  const updateBackground = useCallback((index) => {
    let weatherDescr = '';
    let isDay = true;
    
    if (index === 0) {
      weatherDescr = currentWeatherData?.current?.condition?.text || '';
      isDay = currentWeatherData?.current?.is_day !== 0;
    } else {
      const cityIndex = index - 1;
      if (citiesWeatherData[cityIndex]) {
        weatherDescr = citiesWeatherData[cityIndex]?.cityData?.currentWeatherData?.current?.condition?.text || '';
        isDay = citiesWeatherData[cityIndex]?.cityData?.currentWeatherData?.current?.is_day !== 0;
      }
    }

    const newBackground = getBackgroundByWeather(weatherDescr, isDay);
    setCurrentBackground(newBackground);
    document.body.style.background = newBackground;
  }, [currentWeatherData, citiesWeatherData, setCurrentBackground]);

  const handleSlideChange = useCallback((swiper) => {
    const newIndex = swiper.activeIndex;
    dispatch(setIndexActivePage(newIndex));
    updateBackground(newIndex);
  }, [dispatch, updateBackground]);

  // Инициализация Swiper
  useEffect(() => {
    const initSwiper = () => {
      if (!swiperRef.current && swiperContainerRef.current) {
        swiperRef.current = new Swiper(swiperContainerRef.current, {
          initialSlide: indexActivePage,
          speed: 500, // Увеличено для плавности
          resistanceRatio: 0.7,
          spaceBetween: 20,
          followFinger: true,
          touchAngle: 45,
          shortSwipes: true,
          longSwipesRatio: 0.1,
          grabCursor: true,
          preloadImages: true,
          updateOnWindowResize: true,
          on: {
            slideChange: handleSlideChange,
            touchStart: () => {
              // Можно добавить обработку начала касания
            },
            touchEnd: () => {
              // Можно добавить обработку окончания касания
            },
          },
        });
        updateBackground(indexActivePage);
      }
    };

    initSwiper();

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, [dispatch, indexActivePage, updateBackground, handleSlideChange]);

  // Обновляем Swiper при изменении данных
  useEffect(() => {
    if (swiperRef.current) {
      if (swiperRef.current.slides.length !== citiesWeatherData.length + 1) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
        // Swiper переинициализируется в основном эффекте
      } else {
        swiperRef.current.update();
        if (swiperRef.current.activeIndex !== indexActivePage) {
          swiperRef.current.slideTo(indexActivePage, 500);
        }
      }
    }
  }, [citiesWeatherData.length, indexActivePage]);

  // Обработка изменения активного индекса извне
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== indexActivePage) {
      swiperRef.current.slideTo(indexActivePage, 500);
    }
  }, [indexActivePage]);

  return (
    <div className="HomePage">
      <div className="swiper-container" ref={swiperContainerRef}>
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            
            {/* Прогноз погоды по текущей геопозиции */}
            <WeatherCard
              currentWeatherData={currentWeatherData}
              hourlyForecastData={hourlyForecastData}
              dailyForecastData={dailyForecastData}
              isCurrentLocation={true}
            />
          </div>

          {/* Прогноз погоды избранных городов */}
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