import { legacy_createStore as createStore, combineReducers } from 'redux';
import profileReducer from './profileReducer';
const reducer = combineReducers({
	profilePage: profileReducer,
});

const store = createStore(reducer);

export default store;