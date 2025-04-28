import React from 'react';
import { Routes, Route } from 'react-router-dom';
//===== assets =====//
import './App.scss';
//===== components =====//
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import CityPage from './pages/CityPage/CityPage';

const App = () => {
  return (
    <main className='App'>
      <div className='App__wrapper'>
        <div className='App__container'>
          <div className='App__content'>
            <Routes>
              <Route path='/' element={<Layout />} >
                <Route index element={<HomePage />} />
                {/* <Route path='/city/:cityId' element={<CityPage />} /> */}
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App;