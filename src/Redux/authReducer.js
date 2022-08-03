import { authAPI, usersAPI } from '../api/api';
import { setMyProfileData } from './profileReducer';
import { toggleIsFetching } from './usersReducer';
import { setNetworkError } from './appReducer';
import catchNetworkError from '../helpers/catchNetworkError';

const SET_AUTH_DATA = 'set-auth-data';
const LOGIN = 'login';
const LOGOUT = 'logout';

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
		case LOGIN: 
			return {
				...state,
				data: {...action.data},
				isAuthed: true,
			}
		case LOGIN: 
			return {
				...state,
				data: null,
				isAuthed: false,
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
const loginSuccessfull = (data) => {
	return {
		type: LOGIN,
		data,
	}
}

const logoutSuccessfull = (data) => {
	return {
		type: LOGOUT,
		data,
	}
}

//thunks creators

export const setAuthData = () => async (dispatch) => {
	const resolve = await authAPI.getAuthData();

	if(resolve.resultCode === 0) {
		dispatch(setAuthDataAC(resolve.data));
	}
		
	const data = await usersAPI.getUserById(resolve.data.id);
	if(data) dispatch(setMyProfileData(data));
}

export const login = (data) => async (dispatch) => {
	return catchNetworkError(dispatch, async () => {
		const res = await authAPI.login(data);
		console.log(res);
		if(res.resultCode === 0) {
			dispatch(loginSuccessfull(res.data));
		} else if(res.resultCode === 10) {
			console.log(res.messages[0]);
			return res.messages[0];
		}
	});
}

export const logout = () => async (dispatch) => {
	
	catchNetworkError(dispatch, async () => {
		const res = await authAPI.logout();

		if(res.resultCode === 0) {
			dispatch(logoutSuccessfull());
			dispatch(setAuthDataAC(null));
		}
	})
}
export default authReducer;