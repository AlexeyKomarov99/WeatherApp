import React, {useState, useEffect} from 'react';
//===== react-router =====//
import { Routes, Route, useLocation } from 'react-router-dom';
//===== redux =====//
import {
  useGetCurrentWeatherQuery,
  useGetHourlyForecastQuery,
  useGetDailyForecastQuery,
} from './features/weather/weatherApi';
//===== assets =====//
import './App.scss';
//===== components =====//
import Layout from './components/Layout/Layout';
//===== pages =====//
import HomePage from './pages/HomePage/HomePage';
import CityPage from './pages/CityPage/CityPage';
import FavoritesCities from './pages/FavoritesCities/FavoritesCities';
import WeatherMap from './pages/WeatherMap/WeatherMap';
//===== Services =====//
import { getCurrentLocation } from './services/geolocation';

const App = () => {
  const [coords, setCoords] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/favorites-cities') {
      document.body.classList.add('dark-theme', 'Navbar-hidden');
    } else {
      document.body.classList.remove('dark-theme', 'Navbar-hidden');
    }
  }, [location]);

  // Координаты текущего местоположения
  useEffect(() => {
    const loadCoords = async () => {
      try {
        const { lat, lon } = await getCurrentLocation();
        setCoords({ lat, lon });
      } catch (error) {
        console.error('Ошибка геолокации:', error);
        setCoords(null); // Явно устанавливаем null для fallback
      }
    };
    loadCoords();
  }, []);

  // Получение данных о погоде
  const {
    data: currentWeatherData, 
    isLoading: isCurrentLoading, 
    error: currentError
  } = useGetCurrentWeatherQuery(coords, { skip: !coords });

  // Почасовой прогноз погоды за сутки
  const {
    data: hourlyForecastData, 
    isLoading: isForecastLoading, 
    error: forecastError
  } = useGetHourlyForecastQuery(coords, { skip: !coords });
  
  // Ежедневный прогноз погоды на 10 суток
  const {
    data: dailyForecastData,
    isLoading: isDailyForecastLoading,
    error: dailyForecastError
  } = useGetDailyForecastQuery(coords, { skip: !coords });

  return (
    <main className='App'>
      <div className='App__wrapper'>
        <div className='App__container'>
          <div className='App__content'>
            <Routes>
              <Route path='/' element={<Layout />} >
                <Route index element={<HomePage coords={coords} currentWeatherData={currentWeatherData} hourlyForecastData={hourlyForecastData} dailyForecastData={dailyForecastData} />} />
                {/* <Route path='/city/:cityId' element={<CityPage />} /> */}
                <Route path='/weather-map' element={<WeatherMap />} />
                <Route path='/favorites-cities' element={<FavoritesCities />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App;