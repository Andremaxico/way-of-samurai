import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import state, { setRerenderFn } from './Redux/state';
import App from './App';
import { 
	addPost, 
	addMessage, 
	updateNewPostValue,
	updateNewMessageValue,
} from './Redux/state';

const methods = {
	profilePage: {
		addPost,
		updateNewPostValue,
	},
	messagesPage: {
		addMessage,
		updateNewMessageValue,
	}
}


const root = ReactDOM.createRoot(document.getElementById('root'));
const renderTree = (state) => {
	root.render(
	  <React.StrictMode>
		 <App data={state} methods={methods}/>
	  </React.StrictMode>
	);
}
renderTree(state);
setRerenderFn(renderTree);

