import React, {useEffect, useRef} from 'react';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux';
import {
  setIndexActivePage
} from '../../features/weather/weatherSlice';
import {
  selectIndexActivePage,
  selectCitiesWeatherData,
} from '../../features/weather/weatherSelectors';
//===== react-router =====//
import { Link } from 'react-router-dom';
//===== assets =====//
import './Navbar.scss';
import { FaRegMap as MapIcon } from "react-icons/fa";
import { FaLocationArrow as ArrowIcon } from "react-icons/fa6";
import { FaCircle as CircleIcon } from "react-icons/fa6";
import { IoListOutline as ListCities } from "react-icons/io5";
//===== components =====/
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Navbar = ({
  currentBackground,
}) => {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const citiesWeatherData = useSelector(selectCitiesWeatherData) || [];
  const indexActivePage = useSelector(selectIndexActivePage);

  const handleSlideChange = (swiper) => {
    dispatch(setIndexActivePage(swiper.activeIndex));
  };

  const handleSlideClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
      dispatch(setIndexActivePage(index));
    }
  };

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(indexActivePage);
    }
  }, [indexActivePage]);

  return (
    <div 
      className='Navbar'
      style={{
        background: `${currentBackground}`
      }}
    >
      <div className="Navbar__wrapper">
        <div className="Navbar__container">

          <div className="Navbar__content">
            
            <Link to={`/weather-map`} className='Navbar__link'>
              <div className="Navbar__icon-wrapper icon-wrapper">
                <MapIcon className='Navbar__icon icon' />
              </div>
            </Link>

            <div className="Navbar__swiper-wrapper">
              <Swiper
                ref={swiperRef}
                initialSlide={indexActivePage}
                onSlideChange={handleSlideChange}
                spaceBetween={10}
                slidesPerView={5} // Автоматическое определение количества видимых слайдов
                centeredSlides={true}
                centerInsufficientSlides={true}
                slideToClickedSlide={true}
                className='Navbar__swiper'
              >
                <SwiperSlide 
                  className='Navbar__swiper-slide'
                  onClick={() => handleSlideClick(0)}
                >
                  <div className="Navbar__icon-wrapper">
                    <ArrowIcon className={`Navbar__icon icon-arrow ${indexActivePage === 0 ? 'active-page' : ''}`} />
                  </div>
                  
                </SwiperSlide>
                {citiesWeatherData.map((city, index) => (
                  <SwiperSlide 
                    className='Navbar__swiper-slide' 
                    key={city.cityId}
                    onClick={() => handleSlideClick(index + 1)}
                  >
                    <div className="Navbar__icon-wrapper icon-wrapper-circle">
                      <CircleIcon className={`Navbar__icon icon-circle ${indexActivePage === index + 1 ? 'active-page' : ''}`} />
                    </div>
                  </SwiperSlide>
                ))}
                
              </Swiper>
            </div>
            
            <Link to={`/favorites-cities`} className='Navbar__link'>
              <div className="Navbar__icon-wrapper icon-wrapper">
                <ListCities className='Navbar__icon icon' />
              </div>
            </Link>

          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Navbar;