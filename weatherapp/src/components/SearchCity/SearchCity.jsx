import React, {useState} from 'react';
//===== redux =====//
import {
    useGetCurrentWeatherQuery
} from '../../features/weather/weatherApi';

const SearchCity = () => {
    
    const [searchTerm, setSearchTerm] = useState('');
    
    
    const handleWeatherInfoClick = (e) => {
        e.preventDefault();
        
    }

    return (
    <div className='SearchCity'>
        <input 
            type="text"
            name='searchCity'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Введите название города или аэропорта'
        />
        <button onClick={handleWeatherInfoClick}>Поиск</button>
    </div>
  )
}

export default SearchCity;