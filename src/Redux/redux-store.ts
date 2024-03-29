import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import  ThunkMiddleware  from 'redux-thunk';
import messagesReducer, { MessagesStateType } from './messages-reducer';
import profileReducer, { ProfileStateType } from './profile-reducer';
import sidebarReducer, { SidebarStateType } from './sidebar-reducer';
import usersReducer, { UsersStateType } from './users-reducer';
import authReducer, { AuthStateType } from './auth-reducer';
import appReducer, { AppStateType } from './app-reducer';

type ReducerType = {
	profilePage: ProfileStateType,
	messagesPage: MessagesStateType,
	usersPage: UsersStateType,
	sidebar: SidebarStateType,
	auth: AuthStateType,
	app: AppStateType,
}

const reducer = combineReducers({
	profilePage: profileReducer, //profile reducer returns state
	messagesPage: messagesReducer, //messages reducer returns messages propfile state
	usersPage: usersReducer,
	sidebar: sidebarReducer, //sidebar reducer returns sidebar state
	auth: authReducer,
	app: appReducer,
});


declare global {
	interface Window {
	  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(ThunkMiddleware)));

export default store;