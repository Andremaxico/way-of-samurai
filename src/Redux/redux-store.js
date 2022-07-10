import { combineReducers, legacy_createStore as createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messages-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';

const reducer = combineReducers({
	profilePage: profileReducer, //profile reducer returns state
	messagesPage: messagesReducer, //messages reducer returns messages propfile state
	sidebar: sidebarReducer, //sidebar reducer returns sidebar state
});


const store  = createStore(reducer);

export default store;