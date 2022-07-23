import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import store from './Redux/store';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App state={store.getState()}/>
    </Provider>
  </BrowserRouter>
);

