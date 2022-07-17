import { legacy_createStore as createStore, combineReducers } from 'redux';
import messagesReducer from './messagesReducer';
import profileReducer from './profileReducer';
import sidebarReducer  from './sidebarReducer';
import usersReducer from './usersReducer';
const reducer = combineReducers({
	profilePage: profileReducer,
	messagesPage: messagesReducer,
	usersPage: usersReducer,
	sidebar: sidebarReducer,
});

const store = createStore(reducer);

export default store;