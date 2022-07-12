import { legacy_createStore as createStore, combineReducers } from 'redux';
import messagesReducer from './messagesReducer';
import profileReducer from './profileReducer';
import sidebarReducer  from './sidebarReducer';
const reducer = combineReducers({
	profilePage: profileReducer,
	messagesPage: messagesReducer,
	sidebar: sidebarReducer,
});

const store = createStore(reducer);

export default store;