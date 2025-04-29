import React from 'react';
//===== assets =====//
import './HomePage.scss';
//===== components =====//
import WeatherCard from '../../components/WeatherCard/WeatherCard';

const HomePage = () => {
  return (
    <div className='HomePage'>
      <WeatherCard />
    </div>
  )
}

export default HomePage;