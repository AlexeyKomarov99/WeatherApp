import React from 'react';
//===== assets =====//
import './Navbar.scss';
import { FaRegMap as MapIcon } from "react-icons/fa";
import { FaLocationArrow as ArrowIcon } from "react-icons/fa6";
import { IoListOutline as ListCities } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className='Navbar'>
      <div className="Navbar__container">

        <div className="Navbar__icon-wrapper icon-wrapper">
          <MapIcon className='Navbar__icon icon' />
        </div>

        <div className="Navbar__cities-group icon-wrapper">
          <ArrowIcon className='Navbar__icon icon' />
        </div>
        
        <div className="Navbar__icon-wrapper icon-wrapper">
          <ListCities className='Navbar__icon icon' />
        </div>

      </div>
    </div>
  )
}

export default Navbar;