import {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCitiesWeatherData } from '../../features/weather/weatherSelectors';
import { setCurrentIndex } from '../../features/weather/weatherSlice';
import './HomePage.scss';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import Swiper from 'swiper';
import 'swiper/css';
import { getBackgroundByWeather } from '../../utils/getBackgroundByWeather';

const HomePage = ({
  currentWeatherData, 
  hourlyForecastData, 
  dailyForecastData,
  indexActivePage
}) => {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const rawCitiesWeatherData = useSelector(selectCitiesWeatherData);
  const [currentBackground, setCurrentBackground] = useState(null);

  // Мемоизируем данные городов
  const citiesWeatherData = useMemo(() => rawCitiesWeatherData || [], [rawCitiesWeatherData]);

  // Функция для обновления фона
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
  }, [currentWeatherData, citiesWeatherData]);

  // Инициализация Swiper
  useEffect(() => {
    if (!swiperRef.current && swiperContainerRef.current) {
      swiperRef.current = new Swiper(swiperContainerRef.current, {
        initialSlide: indexActivePage,
        speed: 300,
        resistanceRatio: 0.7,
        spaceBetween: 20,
        on: {
          slideChange: (swiper) => {
            const newIndex = swiper.activeIndex;
            dispatch(setCurrentIndex(newIndex));
            updateBackground(newIndex);
          },
        },
      });
      
      // Первоначальное обновление фона
      updateBackground(indexActivePage);
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
        swiperRef.current = null;
      }
    };
  }, [dispatch, indexActivePage, updateBackground]);

  // Обновляем Swiper при изменении данных
  useEffect(() => {
    if (swiperRef.current) {
      // Полная переинициализация при изменении количества городов
      if (swiperRef.current.destroy) {
        swiperRef.current.destroy();
      }
      
      swiperRef.current = new Swiper(swiperContainerRef.current, {
        initialSlide: Math.min(indexActivePage, citiesWeatherData.length),
        speed: 300,
        resistanceRatio: 0.7,
        spaceBetween: 20,
        on: {
          slideChange: (swiper) => {
            const newIndex = swiper.activeIndex;
            dispatch(setCurrentIndex(newIndex));
            updateBackground(newIndex);
          },
        },
      });
      
      updateBackground(indexActivePage);
    }
  }, [citiesWeatherData.length, dispatch, indexActivePage, updateBackground]);

  // Обработка изменения активного индекса извне
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== indexActivePage) {
      swiperRef.current.slideTo(indexActivePage);
    }
  }, [indexActivePage]);

  return (
    <div className="HomePage">
      <div className="swiper-container" ref={swiperContainerRef}>
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <WeatherCard
              currentWeatherData={currentWeatherData}
              hourlyForecastData={hourlyForecastData}
              dailyForecastData={dailyForecastData}
              isCurrentLocation={true}
            />
          </div>

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