import React from 'react';
import { Outlet } from 'react-router-dom';
//===== assets =====//
import './Layout.scss';
//===== components =====//
import Navbar from '../Navbar/Navbar';

const Layout = () => {
  return (
    <div className='Layout'>
        <Outlet />
        <Navbar />
    </div>
  )
}

export default Layout;