import * as React from 'react';
import 'antd/dist/antd.css';
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
import { Route, Routes, BrowserRouter, HashRouter, Navigate, NavLink, Link, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { compose } from 'redux'; 
import { connect } from 'react-redux';
import { initApp } from './Redux/app-reducer';
import { SidebarStateType } from './Redux/sidebar-reducer';
import { ReducerType, RootStateType } from './Redux/redux-store';
import { MessagesStateType } from './Redux/messages-reducer';

//ant design
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Col, Row } from 'antd';


import { selectLinksData } from './Redux/sidebar-selectors';
import AppHeader from './components/Header';

//lazy components
const ProfileContainer = React.lazy(() => import('./components/Profile'));
const Login = React.lazy(() => import('./components/Login'));
const Messages = React.lazy(() => import('./components/Messages'));

const { Header, Content, Sider } = Layout;

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
  //handle uncauthed errors
  const handlePromiseReject = (PromiseRejectionEvent: any) => {
    console.log(PromiseRejectionEvent);
  }
  React.useEffect(() => {
    props.initApp();
    window.addEventListener('unhandledrejection', handlePromiseReject);

    return window.removeEventListener('unhandledrejection', handlePromiseReject);
  }, []);

  //get suspensed components
  const ProfileSuspensed = withSuspense(ProfileContainer);
  const MessagesSuspensed = withSuspense(Messages);
  const LoginSuspensed = withSuspense(Login);

  //when loading, show preloader
  if(!props.isInitSuccess) return <Preloader />;

  return (
      <Layout>
        <AppHeader />
        <Layout>
          <Sidebar />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
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
            </Content>
          </Layout>
        </Layout>
      </Layout>
     /* <div className="app-wrapper">
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
  </div>*/
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
