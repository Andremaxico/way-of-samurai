//react
import { connect } from 'react-redux';
import { compose } from 'redux';
import React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
//components
import Header from './components/Header';
import Sidenav from './components/Sidebar/Sidebar'
import Profile from './components/Profile';
import Messages from './components/Messages/Messages';
import Users from './components/Users/Users';
import Login from './components/Login';
import Preloader from './UI/Preloader';

//other
import { initApp } from './Redux/appReducer';
import withNetworkCheck from './hocs/withNetworkCheck';


function App(props) {

  useEffect(() => {
    props.initApp();
  }, [])

  if(!props.isInit) return <Preloader />

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

const mapStateToProps = (state) => {
  return {
    isInit: state.app.isInit,
  }
}

export default compose(
  connect(mapStateToProps, {initApp}),
  withNetworkCheck,
)(App);
