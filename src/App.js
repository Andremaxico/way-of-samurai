import logo from './logo.svg';
import './App.scss';
import Header from './components/Header/Header';
import Sidenav from './components/Sidebar/Sidebar'
import Profile from './components/Profile/Profile';
import Messages from './components/Messages/Messages';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Sidenav />
        <div className='content'>
          <Routes>
            <Route path='/profile/*' element={<Profile />} />
            <Route path='/messages/*' element={<Messages />} />
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
