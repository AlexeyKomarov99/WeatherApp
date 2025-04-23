import React from 'react';
import { Routes, Route } from 'react-router-dom';
//===== assets =====//
import './App.css';
//===== components =====//
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import CityPage from './pages/CityPage/CityPage';

const App = () => {
  return (
    <main className='App'>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='/city/:cityId' element={<CityPage />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App;