import React, { use } from 'react';
import { useParams } from 'react-router-dom';
//===== components =====//
import WeatherCard from '../../components/WeatherCard/WeatherCard';

const CityPage = () => {
  const {cityId} = useParams();

  return (
    <div className='CityPage'>
      <WeatherCard cityId={cityId} />
    </div>
  )
}

export default CityPage;