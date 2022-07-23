import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidenav from './components/Sidebar/Sidebar'
import Profile from './components/Profile';
import Messages from './components/Messages/Messages';
import Users from './components/Users/Users';
import Login from './components/Login';

function App(props) {
  return (
    <div className="app-wrapper">
      <Header />
      <Sidenav />
      <div className='content'>
        <Routes>
          <Route path='profile' element={<Profile />}>
            <Route path=':userId' />
          </Route>
          <Route path='login' element={<Login />} />
          <Route  path='/messages/*' element={ <Messages /> }/>
          <Route path='/users/*' element={ <Users /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
