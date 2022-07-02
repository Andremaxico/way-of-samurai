import logo from './logo.svg';
import './App.scss';
import Header from './components/Header/Header';
import Sidenav from './components/Sidebar/Sidebar'
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Sidenav />
      <div className='content'>
        <Profile />
      </div>
    </div>
  );
}

export default App;
