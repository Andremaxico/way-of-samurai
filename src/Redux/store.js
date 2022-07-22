import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import messagesReducer from './messagesReducer';
import profileReducer from './profileReducer';
import sidebarReducer  from './sidebarReducer';
import usersReducer from './usersReducer';
const reducer = combineReducers({
	profilePage: profileReducer,
	messagesPage: messagesReducer,
	usersPage: usersReducer,
	sidebar: sidebarReducer,
	auth: authReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

window.store = store;

export default store;