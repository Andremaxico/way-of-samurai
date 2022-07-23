import { authAPI, usersAPI } from '../api/api';
import { setMyProfileData } from './profileReducer';
import { toggleIsFetching } from './usersReducer';

const SET_AUTH_DATA = 'set-auth-data';

const initialState = {
	data: {
		id: null,
		email: null,
		login: null,
	},
	isAuthed: false,
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTH_DATA:
			return {
				...state,
				data: action.authData,
				isAuthed: true,
			}
	
		default:
			return state;
	}
}

//action creators
const setAuthDataAC = (authData) => {
	return {
		type: SET_AUTH_DATA,
		authData,
	}
}

//thunks creators
export const setAuthData = () => (dispatch) => {

	authAPI.getAuthData().then(res => {
		if(res.resultCode === 0) {
			dispatch(setAuthDataAC(res.data));
			return usersAPI.getUserById(res.data.id);
		}
		
	}).then(data => {
		if(data) dispatch(setMyProfileData(data));
	})
}

export default authReducer;