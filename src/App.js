
import './App.scss';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar'
import Messages from './components/Messages/Messages';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Users from './components/Users';
import ProfileContainer from './components/Profile';

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Sidebar data={props.data.sidebar}/>
        <div className='content'>
            <Routes>
              <Route path='/profile/:userId?' element={<ProfileContainer />} />
              <Route path='/messages/*' element={<Messages data={props.data.messagesPage} dispatch={props.dispatch}/>} />
              <Route path='/users/*' element={<Users />}/>
              <Route path='/news/*' element={<News />} />
              <Route path='/music/*' element={<Music />} />
              <Route path='/settings/*' element={<Settings />} />
            </Routes>
        </div>
      </div>
    </BrowserRouter> 
  );
}

export default App;
