import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import store from './Redux/redux-store';
import App from './App';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderTree = (state) => {
	root.render(
	  <React.StrictMode>
		  <Provider store={store}>
		  	<App data={state} dispatch={store.dispatch.bind(store)}/>
		  </Provider>
	  </React.StrictMode>
	);
}
renderTree(store.getState());

store.subscribe(() => {
	const state = store.getState();
	renderTree(state);
});

