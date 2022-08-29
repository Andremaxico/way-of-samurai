import * as React from 'react';
import './App.scss';
//hocs
import withRouter from './hocs/withRouter';
import withSuspense from './hocs/withSuspense';
//componenst
import HeaderContainer from './components/Header';
import Sidebar from './components/Sidebar/Sidebar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Users from './components/Users/Users';
import Preloader from './UI/Preloader';
//libraries
import { Route, Routes, BrowserRouter, HashRouter, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initApp } from './Redux/app-reducer';
import { SidebarStateType } from './Redux/sidebar-reducer';
import { ReducerType, RootStateType } from './Redux/redux-store';
import { MessagesStateType } from './Redux/messages-reducer';

//lazy components
const ProfileContainer = React.lazy(() => import('./components/Profile'));
const Login = React.lazy(() => import('./components/Login'));
const Messages = React.lazy(() => import('./components/Messages'));

//types
type MapStatePropsType = {
  isInitSuccess: boolean,
  sidebar: SidebarStateType,
  messagesPage: MessagesStateType,
}
type MapDispatchPropsType = {
  initApp: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType;


//==================APP COMPONENT=================
const App: React.FC<PropsType> = (props) => {

  const handlePromiseReject = (PromiseRejectionEvent: any) => {
    console.log(PromiseRejectionEvent);
  }

  React.useEffect(() => {
    props.initApp();
    window.addEventListener('unhandledrejection', handlePromiseReject);

    return window.removeEventListener('unhandledrejection', handlePromiseReject);
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
                  <Route path=':userId'>
                    <Route path=':isFollowed' />
                  </Route>
                </Route>
                <Route path='/messages/*' element={<MessagesSuspensed />} />
                <Route path='/users/*' element={<Users />}/>
                <Route path='/news/*' element={<News />} />
                <Route path='/music/*' element={<Music />} />
                <Route path='/settings/*' element={<Settings />} />
                <Route path='/login/*' element={<LoginSuspensed /> } />
                <Route path='/' element={<Navigate to='/login' replace/>} />
                <Route path='/*' element={<div>404: page not found</div>} />
            </Routes>
        </div>
      </div>
  );
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
  return {
    isInitSuccess: state.app.isInitSuccess,
    sidebar: state.sidebar,
    messagesPage: state.messagesPage,
  }
} 

const AppContainer = compose(
  connect<MapStatePropsType, MapDispatchPropsType>(mapStateToProps, { initApp }),
 // withNetworkRedirect,
  withRouter,
)(App);

type SamuraiAppPropsType = {store: any};

const SamuraiApp: React.FC<SamuraiAppPropsType> = (props) => (
  <HashRouter>
    <Provider store={props.store}>
      <AppContainer />
    </Provider>
  </HashRouter> 
);

export default SamuraiApp;
