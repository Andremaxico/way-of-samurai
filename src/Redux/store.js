import { legacy_createStore as createStore, combineReducers } from 'redux';
import profileReducer from './profileReducer';
import sidebarReducer  from './sidebarReducer';
const reducer = combineReducers({
	profilePage: profileReducer,
	sidebar: sidebarReducer,
});

const store = createStore(reducer);

export default store;