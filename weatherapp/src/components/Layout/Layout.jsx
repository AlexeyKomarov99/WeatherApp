import React from 'react';
//===== react-route =====//
import { Outlet, useLocation } from 'react-router-dom';
//===== assets =====//
import './Layout.scss';
//===== components =====//
import Navbar from '../Navbar/Navbar';

const Layout = () => {

  return (
    <div className='Layout'>
        <Outlet className='Outlet' />
        <ConditionalNavbar className='Navbar'/>
    </div>
  )
}

const ConditionalNavbar = () => {
  const location = useLocation();
  const hiddenPaths = ['/weather-map', '/favorites-cities'];
  return !hiddenPaths.includes(location.pathname) ? <Navbar /> : null;
}

export default Layout;