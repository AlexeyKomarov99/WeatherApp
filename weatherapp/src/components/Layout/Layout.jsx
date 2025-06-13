import React, {useState} from 'react';
//===== react-route =====//
import { Outlet, useLocation } from 'react-router-dom';
//===== assets =====//
import './Layout.scss';
//===== components =====//
import Navbar from '../Navbar/Navbar';

const Layout = ({indexActivePage}) => {

  return (
    <div className='Layout'>
        <Outlet className='Outlet' />
        <ConditionalNavbar 
          className='Navbar'
          indexActivePage={indexActivePage}
        />
    </div>
  )
}

const ConditionalNavbar = ({indexActivePage}) => {
  const location = useLocation();
  const hiddenPaths = ['/weather-map', '/favorites-cities'];
  return !hiddenPaths.includes(location.pathname) ? <Navbar indexActivePage={indexActivePage} /> : null;
}

export default Layout;