import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import  ThunkMiddleware  from 'redux-thunk';
import messagesReducer from './messages-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';

const reducer = combineReducers({
	profilePage: profileReducer, //profile reducer returns state
	messagesPage: messagesReducer, //messages reducer returns messages propfile state
	usersPage: usersReducer,
	sidebar: sidebarReducer, //sidebar reducer returns sidebar state
	auth: authReducer,
	app: appReducer,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(ThunkMiddleware)));

window.store = store;

export default store;