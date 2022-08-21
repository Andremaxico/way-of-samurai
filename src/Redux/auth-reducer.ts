import { getIsAuthed } from './auth-selectors';
import { authAPI, profileAPI, usersAPI, securityAPI } from "../api/api";
import { setNetworkError } from "./app-reducer";
import { setMyProfileInfo, setMyStatus } from "./profile-reducer";
import { toggleIsFetchingAC } from "./users-reducer";
import { AppDispatch } from './redux-store';
import { AnyAction } from 'redux';
import { AuthDataType } from '../types/types';

//=================ACTION TYPES CONSTS=========================
const SET_AUTH_DATA = 'auth/set-auth-data';
const GET_CAPTCHA_URL_SUCCESSFUL = 'auth/get-capthca-url-successful';


//======================STATE, REDUCER===================

export type AuthStateType = {
	isAuthed: boolean,
	data: AuthDataType,
	captchaUrl: string | null,
}

const initialState: AuthStateType = {
	data: {
		login: null,
		email: null,
		id: null,
	},
	isAuthed: false,
	captchaUrl: null,
}

const authReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case SET_AUTH_DATA:
			return {
				...state,
				data: {...action.data, isAuthed: action.isAuthed},
			}
		case GET_CAPTCHA_URL_SUCCESSFUL: 
			return {
				...state,
				captchaUrl: action.captcha
			}
		default:
			return state
	}
}

//==================ACTION CREATORS================

///set auth data
type SetAuthDataActionType = {
	type: typeof SET_AUTH_DATA,
	data: any,
	isAuthed: boolean,
}

export const setAuthDataAC = (data: any, isAuthed: boolean): SetAuthDataActionType => {
	return {
		type: SET_AUTH_DATA,
		data,
		isAuthed,
	}
}

//get captcha url successful
type GetCaptchaUrlActionType = {
	type: typeof GET_CAPTCHA_URL_SUCCESSFUL,
	captcha: string,
}

export const getCaptchaUrlSuccessful = (captcha: string): GetCaptchaUrlActionType => {
	return {
		type: GET_CAPTCHA_URL_SUCCESSFUL,
		captcha,
	}
}


//================THUNKS=================

export const setAuthData = () => async (dispatch: any) => {
	dispatch(toggleIsFetchingAC(true));
	try {
		const res = await authAPI.getAuthInfo();
		console.log(res.data);

		if(res.resultCode === 0) {
			//login, email, id
			dispatch(setAuthDataAC(res.data, true));
		}
	
		const data = await usersAPI.getUserById(res.data.id);
		if(data) {
			//all info
			console.log(data);
			dispatch(setMyProfileInfo(data));
		}

		//set my status from server to my profileData
		const status = await profileAPI.getUserStatus(data.userId);
		if(status && status.length > 0) dispatch(setMyStatus(status));
		dispatch(toggleIsFetchingAC(false));

		//set captcha
		dispatch(getCaptchaUrl());
	} catch(e) {
		console.log(e.code);
		if	(e.code === "ERR_NETWORK") dispatch(setNetworkError(true))
	}
}

export const getCaptchaUrl = () => async (dispatch: any) => {
	const captcha = await securityAPI.getCaptchaUrl();
	if(captcha) dispatch(getCaptchaUrlSuccessful(captcha.url));
}


//login
type LoginDataType = {

}

export const login = (data: any) => async (dispatch: any) => {
	console.log(data);
	try {
		const res = await authAPI.login(data);
		dispatch(setNetworkError(false));
		if(res.resultCode === 0) {
			dispatch( setAuthData() );
		} else {
			if(res.resultCode === 10) {
				dispatch(getCaptchaUrl());
			}
			dispatch(getCaptchaUrl)
			return res.messages[0];
		}
	} catch(e) {
		if(e.code === "ERR_NETWORK") dispatch(setNetworkError(true));
	}
}

export const logout = () => async (dispatch: any) => {
	const res = await authAPI.logout();

	if(res.resultCode === 0) {
		dispatch( setAuthDataAC(null, false) );
		dispatch( setMyProfileInfo(null) );
	}
}

export default authReducer;