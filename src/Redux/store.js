import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './appReducer';
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
	app: appReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

window.store = store;

export default store;