import logo from './logo.svg';
import './App.scss';
import Header from './components/Header';
import Sidenav from './components/Sidenav'
import Profile from './components/Profile';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <aside className='sidebar'>
        <Sidenav />
      </aside>
      <div className='content'>
        <Profile />
      </div>
    </div>
  );
}

export default App;
