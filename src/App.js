import React, { Component } from 'react';
import './App.scss';
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
//libraries
import { Route, Routes } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initApp } from './Redux/app-reducer';
import withRouter from './hocs/withRouter';
import Preloader from './UI/Preloader';

class App extends Component {
  componentDidMount() {
    this.props.initApp();
  }

  render() {
    if(!this.props.isInitSuccess) return <Preloader />;

    return (
        <div className="app-wrapper">
          <HeaderContainer />
          <Sidebar data={this.props.data.sidebar}/>
          <div className='content'>
              <Routes>
                <Route path='/profile' element={<ProfileContainer />}>
                  <Route path=':userId'/>
                </Route>
                <Route path='/messages/*' element={<Messages data={this.props.data.messagesPage} dispatch={this.props.dispatch} isAuthed={this.props.data.auth.isAuthed}/>} />
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
}

const mapStateToProps = (state) => {
  return {
    isInitSuccess: state.app.isInitSuccess,
  }
} 

export default compose(
  connect(mapStateToProps, { initApp }),
  withRouter,
)(App);
