import ReactDOM from 'react-dom/client';
import App from './App';
import { addPost, addMessage } from './Redux/state';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderTree = (state) => {
	root.render(
	  <React.StrictMode>
		 <App data={state} methods={{addPost, addMessage}}/>
	  </React.StrictMode>
	);
}

export default renderTree;