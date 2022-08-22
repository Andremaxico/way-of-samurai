import { Dispatch } from 'react';
import { authAPI, profileAPI, usersAPI, securityAPI } from "../api/api";
import { setNetworkError, SetNetworkErrorActionType } from "./app-reducer";
import { setMyProfileInfo, SetMyProfileInfoActionType, setMyStatus, SetMyStatusActionType } from "./profile-reducer";
import { toggleIsFetchingAC, ToggleIsFetchingActionType } from "./users-reducer";
import { RootStateType } from './redux-store';
import { AuthDataType } from '../types/types';
import { ThunkAction } from 'redux-thunk';

//=================ACTION TYPES CONSTS=========================
const SET_AUTH_DATA = 'auth/set-auth-data';
const GET_CAPTCHA_URL_SUCCESSFUL = 'auth/get-capthca-url-successful';


//======================STATE, REDUCER===================

export type AuthStateType = {
	isAuthed: boolean,
	data: AuthDataType,
	captchaUrl: string | null,
}
type ImportedActionsType = GetCaptchaUrlActionType | ToggleIsFetchingActionType | SetNetworkErrorActionType |
									SetMyProfileInfoActionType | SetMyStatusActionType;

type ActionType = SetAuthDataActionType | ImportedActionsType;
type ThunkType = ThunkAction<void, RootStateType, unknown, ActionType>;
type DispatchType = Dispatch<ActionType | ThunkType>;

const initialState: AuthStateType = {
	data: {
		login: null,
		email: null,
		id: null,
	},
	isAuthed: false,
	captchaUrl: null,
}

const authReducer = (state = initialState, action: ActionType) => {
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
export type GetCaptchaUrlActionType = {
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

export const setAuthData = (): ThunkType => async (dispatch: DispatchType) => {
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
		const status = await profileAPI.getUserStatus(data.data.userId);
		if(status && status.length > 0) dispatch(setMyStatus(status));
		dispatch(toggleIsFetchingAC(false));

		//set captcha
		dispatch(getCaptchaUrl());
	} catch(e) {
		console.log(e.code);
		if	(e.code === "ERR_NETWORK") dispatch(setNetworkError(true))
	}
}

export const getCaptchaUrl = (): ThunkType => async (dispatch: DispatchType) => {
	const captcha = await securityAPI.getCaptchaUrl();
	if(captcha) dispatch(getCaptchaUrlSuccessful(captcha.url));
}


//login

export const login = (data: any): ThunkType => async (dispatch: DispatchType) => {
	try {
		const res = await authAPI.login(data);
		dispatch(setNetworkError(false));
		if(res.resultCode === 0) {
			dispatch( setAuthData() );
		} else {
			if(res.resultCode === 10) {
				dispatch(getCaptchaUrl());
			}
			dispatch(getCaptchaUrl())
			return res.messages[0];
		}
	} catch(e) {
		if(e.code === "ERR_NETWORK") dispatch(setNetworkError(true));
	}
}

export const logout = (): ThunkType => async (dispatch: DispatchType) => {
	const res = await authAPI.logout();

	if(res.resultCode === 0) {
		dispatch( setAuthDataAC(null, false) );
		dispatch( setMyProfileInfo(null) );
	}
}

export default authReducer;