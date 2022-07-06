import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import state from  './Redux/state';

console.log(state.context);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App data={state} />
  </React.StrictMode>
);

