import React, { Component, useEffect } from 'react';
import './App.scss';
//hocs
import withNetworkRedirect from './hocs/withNetworkRedirect';
import withRouter from './hocs/withRouter';
//componenst
import HeaderContainer from './components/Header';
import Sidebar from './components/Sidebar/Sidebar'
import Messages from './components/Messages/Messages';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Users from './components/Users';
import ProfileContainer from './components/Profile';
import Login from './components/Login';
import Preloader from './UI/Preloader';
//libraries
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initApp } from './Redux/app-reducer';
const App = (props) => {
  useEffect(() => {
    props.initApp();
  }, []);

  if(!props.isInitSuccess) return <Preloader />;

  return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Sidebar data={props.sidebar}/>
        <div className='content'>
            <Routes>
              <Route path='/profile' element={<ProfileContainer />}>
                <Route path=':userId'/>
              </Route>
              <Route path='/messages/*' element={<Messages />} />
              <Route path='/users/*' element={<Users />}/>
              <Route path='/news/*' element={<News />} />
              <Route path='/music/*' element={<Music />} />
              <Route path='/settings/*' element={<Settings />} />
              <Route path='/login/*' element={<Login /> } />
            </Routes>
        </div>
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isInitSuccess: state.app.isInitSuccess,
    sidebar: state.sidebar,
    messagesPage: state.messagesPage,
  }
} 

const AppContainer = compose(
  connect(mapStateToProps, { initApp }),
 // withNetworkRedirect,
  withRouter,
)(App);

const SamuraiApp = (props) => (
  <BrowserRouter>
    <Provider store={props.store}>
      <AppContainer {...props}/>
    </Provider>
  </BrowserRouter> 
);

export default SamuraiApp;
