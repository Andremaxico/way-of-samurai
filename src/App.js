import logo from './logo.svg';
import './App.scss';
import Header from './components/Header/Header';
import Sidenav from './components/Sidebar/Sidebar'
import Profile from './components/Profile/Profile';
import Messages from './components/Messages/Messages';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Sidenav />
      <div className='content'>
        {/*<Profile />*/}
        <Messages />
      </div>
    </div>
  );
}

export default App;
