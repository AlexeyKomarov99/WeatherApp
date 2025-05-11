import React from 'react';
//===== react-router =====//
import { Link } from 'react-router-dom';
//===== assets =====//
import './Navbar.scss';
import { FaRegMap as MapIcon } from "react-icons/fa";
import { FaLocationArrow as ArrowIcon } from "react-icons/fa6";
import { IoListOutline as ListCities } from "react-icons/io5";

const Navbar = () => {

  return (
    <div className='Navbar'>
      <div className="Navbar__wrapper">
        <div className="Navbar__container">

          <div className="Navbar__content">
            
            <Link to={`/weather-map`} className='Navbar__link'>
              <div className="Navbar__icon-wrapper icon-wrapper">
                <MapIcon className='Navbar__icon icon' />
              </div>
            </Link>

            <Link to={``} className='Navbar__link'>
              <div className="Navbar__cities-group icon-wrapper">
                <ArrowIcon className='Navbar__icon icon' />
              </div>
            </Link>
            
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