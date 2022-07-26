import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import store from './Redux/redux-store';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const state = store.getState();
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App data={state} dispatch={store.dispatch.bind(store)}/>
    </Provider>
  </BrowserRouter> 
);

