import React, {useState} from 'react';
//===== react-route =====//
import { Outlet, useLocation } from 'react-router-dom';
//===== assets =====//
import './Layout.scss';
//===== components =====//
import Navbar from '../Navbar/Navbar';

const Layout = ({
  currentBackground
}) => {

  return (
    <div className='Layout'>
        <Outlet className='Outlet' />
        <ConditionalNavbar 
          className='Navbar'
          currentBackground={currentBackground}
        />
    </div>
  )
}

const ConditionalNavbar = ({currentBackground}) => {
  const location = useLocation();
  const hiddenPaths = ['/weather-map', '/favorites-cities'];
  return !hiddenPaths.includes(location.pathname) ? <Navbar currentBackground={currentBackground} /> : null;
}

export default Layout;