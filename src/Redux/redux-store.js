import { combineReducers, legacy_createStore as createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messages-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';

const reducers = combineReducers({
	profilePage: profileReducer,
	messagesPage: messagesReducer,
	sidebar: sidebarReducer,
});

const store  = configureStore(reducers);

export default store;