import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.scss';
import store from './Redux/redux-store';
import SamuraiApp from './App';

const rootElement = document.getElementById('root')!;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <SamuraiApp store={store} />
);

