import React, { Component, useEffect } from 'react';
import './App.scss';
//hocs
import withNetworkRedirect from './hocs/withNetworkRedirect';
import withRouter from './hocs/withRouter';
import withSuspense from './hocs/withSuspense';
//componenst
import HeaderContainer from './components/Header';
import Sidebar from './components/Sidebar/Sidebar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Users from './components/Users';
import Preloader from './UI/Preloader';
//libraries
import { Route, Routes, BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initApp } from './Redux/app-reducer';

//lazy components
const ProfileContainer = React.lazy(() => import('./components/Profile'));
const Login = React.lazy(() => import('./components/Login'));
const Messages = React.lazy(() => import('./components/Messages'));


const App = (props) => {
  useEffect(() => {
    props.initApp();
  }, []);

  const ProfileSuspensed = withSuspense(ProfileContainer);
  const MessagesSuspensed = withSuspense(Messages);
  const LoginSuspensed = withSuspense(Login);

  if(!props.isInitSuccess) return <Preloader />;

  return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Sidebar data={props.sidebar}/>
        <div className='content'>
            <Routes>
              <Route path='/profile' element={<ProfileSuspensed />}>
                <Route path=':userId'/>
              </Route>
              <Route path='/messages/*' element={<MessagesSuspensed />} />
              <Route path='/users/*' element={<Users />}/>
              <Route path='/news/*' element={<News />} />
              <Route path='/music/*' element={<Music />} />
              <Route path='/settings/*' element={<Settings />} />
              <Route path='/login/*' element={<LoginSuspensed /> } />
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
  <HashRouter>
    <Provider store={props.store}>
      <AppContainer {...props}/>
    </Provider>
  </HashRouter> 
);

export default SamuraiApp;
