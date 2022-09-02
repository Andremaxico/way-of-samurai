import { LoginDataType, ResultCodeEnum } from './../types/types';
import { Dispatch } from 'react';
import { authAPI } from "../api/authApi";
import { profileAPI } from "../api/profileApi";
import { usersAPI } from "../api/usersApi";
import { securityAPI } from "../api/securityApi";
import { appActions } from "./app-reducer";
import { profileActions } from "./profile-reducer";
import { usersActions } from "./users-reducer";
import { RootStateType, InferActionsType } from './redux-store';
import { AuthDataType } from '../types/types';
import { ThunkAction } from 'redux-thunk';

//======================STATE, REDUCER===================
type SetMyProfileInfoType = ReturnType<typeof profileActions.setMyProfileInfo>;
type SetMyStatusType = ReturnType<typeof profileActions.setMyStatus>;
type SetNetworkErrorType = ReturnType<typeof appActions.setNetworkError>;
type ToggleIsFetchingACType = ReturnType<typeof usersActions.toggleIsFetchingAC>;

type ImportedActionsType = SetMyProfileInfoType | SetMyStatusType | 
									ToggleIsFetchingACType | SetNetworkErrorType;

export type AuthActionsType = InferActionsType<typeof authActions>;
type ThunkType = ThunkAction<void, RootStateType, unknown, AuthActionsType>;
type DispatchType = Dispatch<AuthActionsType | ThunkType | ImportedActionsType>;

const initialState = {
	data: {} as AuthDataType,
	isAuthed: false as boolean,
	captchaUrl: null as string | null,
	loginError: null as string | null,
}
export type AuthStateType = typeof initialState;

const authReducer = (state = initialState, action: AuthActionsType): AuthStateType => {
	switch (action.type) {
		case 'SET_AUTH_DATA':
			return {
				...state,
				data: {...action.data},
				isAuthed: action.isAuthed,
			}
		case 'GET_CAPTCHA_URL_SUCCESSFUL': 
			return {
				...state,
				captchaUrl: action.captcha
			}
		case 'SET_LOGIN_ERROR': 
			return {...state, loginError: action.value}
		default:
			return state
	}
}

//==================ACTION CREATORS================

export const authActions = {
	setAuthDataAC: (data: AuthDataType, isAuthed: boolean) => ({
		type: 'SET_AUTH_DATA',
		data,
		isAuthed,
	} as const),
	setLoginError: (value: string) => ({
		type: 'SET_LOGIN_ERROR',
		value,
	} as const),
	getCaptchaUrlSuccessful: (captcha: string) => (
		{
			type: 'GET_CAPTCHA_URL_SUCCESSFUL',
			captcha,
		} as const
	),
}

//================THUNKS=================

export const setAuthData = (): ThunkType => async (dispatch: DispatchType) => {
	dispatch(usersActions.toggleIsFetchingAC(true));
	try {
		const res = await authAPI.getAuthInfo();
		console.log(res.data);

		if(res.resultCode === ResultCodeEnum.Success) {
			//login, email, id
			dispatch(authActions.setAuthDataAC(res.data, true));
		} else if(res.resultCode === ResultCodeEnum.CaptchaRequired) {
			//set captcha
			dispatch(getCaptchaUrl());
		}
	
		const data = await usersAPI.getUserById(res.data.id);
		if(data) {
			//all info
			dispatch(profileActions.setMyProfileInfo(data));
		}

		//set my status from server to my profileData
		const status = await profileAPI.getUserStatus(data.userId);
		if(status && status.length > 0) dispatch(profileActions.setMyStatus(status));
		dispatch(usersActions.toggleIsFetchingAC(false));
	} catch(e) { 
		if	(e.code === "ERR_NETWORK") dispatch(appActions.setNetworkError(true))
	}
}

export const getCaptchaUrl = (): ThunkType => async (dispatch: DispatchType) => {
	const captcha = await securityAPI.getCaptchaUrl();
	if(captcha) dispatch(authActions.getCaptchaUrlSuccessful(captcha.url));
}


//login

export const login = (data: LoginDataType): ThunkType => async (dispatch: DispatchType) => {
	try {
		const res = await authAPI.login(data);
		dispatch(appActions.setNetworkError(false));
		if(res.resultCode === ResultCodeEnum.Success) {
			dispatch( setAuthData() );
		} else {
			if(res.resultCode === ResultCodeEnum.CaptchaRequired) {
				dispatch(getCaptchaUrl());
			}
			dispatch(getCaptchaUrl());
			dispatch(authActions.setLoginError(res.messages[0]));
		}
	} catch(e) {
		if(e.code === "ERR_NETWORK") dispatch(appActions.setNetworkError(true));
	}
}

export const logout = (): ThunkType => async (dispatch: DispatchType) => {
	const res = await authAPI.logout();

	if(res.resultCode === ResultCodeEnum.Success) {
		dispatch( authActions.setAuthDataAC({login: null, email: null, id: null}, false));
		dispatch( profileActions.setMyProfileInfo(null) );
	}
}

export default authReducer;