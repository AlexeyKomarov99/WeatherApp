import React, {useState, useRef, useEffect} from 'react';
//===== redux =====//
import {
    useGetCurrentWeatherQuery,
    useGetHourlyForecastQuery,
    useGetDailyForecastQuery,
    useLazySearchCitiesQuery
} from '../../features/weather/weatherApi';
//===== assets =====//
import './SearchCity.scss';
import { IoSearch as SearchIcon } from "react-icons/io5";
//===== components =====//
import ModalWindowFoundCity from '../../components/ModalWindowFoundCity/ModalWindowFoundCity';

const SearchCity = ({blackout, setBlackout, isActiveMW, setIsActiveMW}) => {
    const [selectedCity, setSelectedCity] = useState({});
    const [coords, setCoords] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [triggerSearch, { data: citiesData, isFetching }] = useLazySearchCitiesQuery();
    const inputFocus = useRef(null);

    // Обработчик изменения input
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.length > 2) {
            triggerSearch(value);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }

    // Обработчик выбора города из списка
    const handleSelectCity = (city) => {
        setShowSuggestions(false);
        
        let id = city.id;
        let lat = city.lat;
        let lon = city.lon;
        let cityName = city.name;
        let region = city.region;
        let country = city.country;
        setSelectedCity({id, lat, lon, cityName, region, country});
        setCoords({lat, lon});

        setIsActiveMW(true);
    };

    const handleFocus = () => {
        setBlackout(true);
         if (searchTerm.length > 2) {
            setShowSuggestions(true);
        }
    };

    const handleBlur = () => {
        // Добавляем задержку, чтобы успеть обработать клик по предложению
        setTimeout(() => {
            setShowSuggestions(false);
            setBlackout(false);
        }, 200);
    };

    const handleCancel = () => {
        setSearchTerm("");
        setSuggestions([]);
        setShowSuggestions(false);
        setBlackout(false);
        if (inputFocus.current) {
            inputFocus.current.blur();
        }
    };

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

    // Эффект для обновления списка предложений при получении данных
    useEffect(() => {
        if(citiesData) {
            setSuggestions(citiesData);
            console.log(citiesData);
        }
    }, [citiesData]);

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
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder='Поиск города или аэропорта'
                        autoComplete="off"
                    />
                </div>
                <button 
                    className={`SearchCity__cancel ${blackout ? 'input-active' : 'input-inactive'}`}
                    onClick={handleCancel}
                >
                    Отмена
                </button>
            </div>

            {showSuggestions && (
                <div className="SearchCity__suggestions">
                    {isFetching ? (
                        <div className="SearchCity__suggestions-item">Загрузка</div>
                    ) : suggestions.length > 0 ? (
                        suggestions.map((city) => (
                            <div 
                                key={city.id}
                                className="SearchCity__suggestions-item"
                                onClick={() => handleSelectCity(city)}
                            >
                                <div className="SearchCity__city-name">{`${city.name}, ${city.region} - ${city.country}`}</div>
                            </div>
                        ))
                    ) : (
                        <div className="SearchCity__suggestion-item">Ничего не найдено</div>
                    )}
                </div>
            )}
            
            <ModalWindowFoundCity
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                setCoords={setCoords}
                setSearchTerm={setSearchTerm}
                setSuggestions={setSuggestions}
                isActiveMW={isActiveMW}
                setIsActiveMW={setIsActiveMW}
                onClose={() => setIsActiveMW(false)}
                currentWeatherData={currentWeatherData}
                hourlyForecastData={hourlyForecastData}
                dailyForecastData={dailyForecastData}
            />

        </div>
    )
}

export default SearchCity;