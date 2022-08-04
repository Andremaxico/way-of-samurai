import { authAPI, usersAPI, profileAPI } from '../api/api';
import { changeMyStatus, setMyProfileData } from './profileReducer';
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
	isLogging: false,
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTH_DATA:
			return {
				...state,
				data: action.authData,
				isAuthed: action.authData ? true : false,
			}
		case LOGOUT: 
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

const logoutSuccessfull = () => {
	return {
		type: LOGOUT,
	}
}

//thunks creators

export const setAuthData = () => async (dispatch) => {
	const resolve = await authAPI.getAuthData();
	if(resolve.resultCode === 0) {
		dispatch(setAuthDataAC(resolve.data));
	}

	const data = resolve.data.id ? await usersAPI.getUserById(resolve.data.id) : null;
	if(data) dispatch(setMyProfileData(data));

	const status = data ? await profileAPI.getUserStatus(data.userId) : '';
	if(status) dispatch(changeMyStatus(status));
}

export const login = (data) => async (dispatch) => {
	return catchNetworkError(dispatch, async () => {

		const res = await authAPI.login(data);
		if(res.resultCode === 0) {
			dispatch(setAuthData());

		} else if(res.resultCode === 1) {
			return res.messages[0];
		}
	});
}

export const logout = () => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	await catchNetworkError(dispatch, async () => {
		const res = await authAPI.logout();

		if(res.resultCode === 0) {
			dispatch(logoutSuccessfull());
			dispatch(setMyProfileData(null)); 
			dispatch(setAuthDataAC(null));
		}
	});
	dispatch(toggleIsFetching(false));
}
export default authReducer;