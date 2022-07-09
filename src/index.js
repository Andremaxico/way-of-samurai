import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import store from './Redux/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderTree = (state) => {
	root.render(
	  <React.StrictMode>
		 <App data={state} dispatch={store.dispatch.bind(store)}/>
	  </React.StrictMode>
	);
}
renderTree(store.getState());
store.subscribe(renderTree);

