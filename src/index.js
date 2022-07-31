import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import store from './Redux/redux-store';
import SamuraiApp from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <SamuraiApp store={store} />
);

