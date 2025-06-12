import React, {useState, useRef, useEffect} from 'react';
//===== redux =====//
import {
    useLazySearchCitiesQuery
} from '../../features/weather/weatherApi';
//===== assets =====//
import './SearchCity.scss';
import { IoSearch as SearchIcon } from "react-icons/io5";

const SearchCity = ({blackout, setBlackout}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const inputFocus = useRef(null);

    const handleFocus = () => {
        setBlackout(true);
    };

    const handleBlur = () => {
        setBlackout(false);
    };

    const handleCancel = () => {
        setSearchTerm("");
        setBlackout(false);
        if (inputFocus.current) {
            inputFocus.current.blur();
        }
    }

    return (
        <div 
            className={`SearchCity ${blackout ? 'content-up' : ''}`}
        >
            <div className="SearchCity__content">
                <div className="SearchCity__input-wrapper">
                    <div className="SearchCity__icon-wrapper icon-wrapper">
                        <SearchIcon className='icon' />
                    </div>
                    <input
                        ref={inputFocus}
                        className={`SearchCity__input`}
                        type="text"
                        name='searchCity'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder='Поиск города или аэропорта'
                    />
                </div>
                <button 
                    className={`SearchCity__cancel ${blackout ? 'input-active' : 'input-inactive'}`}
                    onClick={handleCancel}
                >
                    Отмена
                </button>
            </div>
        </div>
    )
}

export default SearchCity;