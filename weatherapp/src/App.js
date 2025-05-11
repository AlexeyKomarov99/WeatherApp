import React, {useEffect} from 'react';
//===== react-router =====//
import { Routes, Route, useLocation } from 'react-router-dom';
//===== assets =====//
import './App.scss';
//===== components =====//
import Layout from './components/Layout/Layout';
//===== pages =====//
import HomePage from './pages/HomePage/HomePage';
import CityPage from './pages/CityPage/CityPage';
import FavoritesCities from './pages/FavoritesCities/FavoritesCities';
import WeatherMap from './pages/WeatherMap/WeatherMap';

const App = () => {
  
  const location = useLocation();
  useEffect(() => {
    if(location.pathname === '/favorites-cities') {
      document.body.classList.add('dark-theme', 'Navbar-hidden');
    } else {
      document.body.classList.remove('dark-theme', 'Navbar-hidden');
    }
  }, [location]);
  
  return (
    <main className='App'>
      <div className='App__wrapper'>
        <div className='App__container'>
          <div className='App__content'>
            <Routes>
              <Route path='/' element={<Layout />} >
                <Route index element={<HomePage />} />
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