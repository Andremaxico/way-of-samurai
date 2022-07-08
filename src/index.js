import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import store from './Redux/state';
import App from './App';

const methods = {
	profilePage: {
		addPost: store.addPost.bind(store),
		updateNewPostValue: store.updateNewPostValue.bind(store),
	},
	messagesPage: {
		addMessage: store.addMessage.bind(store),
		updateNewMessageValue: store.updateNewMessageValue.bind(store),
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
renderTree(store.getState());
store.subscribe(renderTree);

