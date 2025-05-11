import React, {useState} from 'react';
//===== redux =====//
import {
    useGetCurrentWeatherQuery
} from '../../features/weather/weatherApi';
//===== assets =====//
import './SearchCity.scss';
import { IoSearch as SearchIcon } from "react-icons/io5";

const SearchCity = () => {
    
    const [searchTerm, setSearchTerm] = useState('');

    return (
    <div className='SearchCity'>
        <div className="SearchCity__content">
            <div className="SearchCity__icon-wrapper icon-wrapper">
                <SearchIcon className='icon' />
            </div>
            <input
                className='SearchCity__input'
                type="text"
                name='searchCity'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Поиск города или аэропорта'
            />
            {/* <button>Отмена</button> */}
        </div>
    </div>
  )
}

export default SearchCity;