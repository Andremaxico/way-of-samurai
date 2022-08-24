import { LoginDataType, ResultCodeEnum } from './../types/types';
import { Dispatch } from 'react';
import { authAPI, profileAPI, usersAPI, securityAPI } from "../api/api";
import { appActions } from "./app-reducer";
import { profileActions } from "./profile-reducer";
import { usersActions } from "./users-reducer";
import { RootStateType, InferActionsType } from './redux-store';
import { AuthDataType } from '../types/types';
import { ThunkAction } from 'redux-thunk';

//=================ACTION TYPES CONSTS========================='


//======================STATE, REDUCER===================

export type AuthStateType = {
	isAuthed: boolean,
	data: AuthDataType,
	captchaUrl: string | null,
}

const { setMyProfileInfo, setMyStatus } = profileActions;
const { setNetworkError } = appActions;
const { toggleIsFetchingAC } = usersActions;

type ImportedActionsType = ReturnType<typeof setMyProfileInfo> | ReturnType<typeof setMyStatus> | 
									ReturnType<typeof toggleIsFetchingAC> | ReturnType<typeof setNetworkError>;

export type AuthActionsType = InferActionsType<typeof authActions>;
type ThunkType = ThunkAction<void, RootStateType, unknown, AuthActionsType>;
type DispatchType = Dispatch<AuthActionsType | ThunkType | ImportedActionsType>;

const initialState: AuthStateType = {
	data: {
		login: null,
		email: null,
		id: null,
	},
	isAuthed: false,
	captchaUrl: null,
}

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
	
	getCaptchaUrlSuccessful: (captcha: string) => (
		{
			type: 'GET_CAPTCHA_URL_SUCCESSFUL',
			captcha,
		} as const
	)
}



//================THUNKS=================

export const setAuthData = (): ThunkType => async (dispatch: DispatchType) => {
	dispatch(toggleIsFetchingAC(true));
	try {
		const res = await authAPI.getAuthInfo();
		console.log(res.data);

		if(res.resultCode === ResultCodeEnum.Success) {
			//login, email, id
			dispatch(authActions.setAuthDataAC(res.data, true));
		}
	
		const data = await usersAPI.getUserById(res.data.id);
		if(data) {
			//all info

			dispatch(setMyProfileInfo(data.data ));
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
	if(captcha) dispatch(authActions.getCaptchaUrlSuccessful(captcha.url));
}


//login

export const login = (data: LoginDataType): ThunkType => async (dispatch: DispatchType) => {
	try {
		const res = await authAPI.login(data);
		dispatch(setNetworkError(false));
		if(res.resultCode === ResultCodeEnum.Success) {
			dispatch( setAuthData() );
		} else {
			if(res.resultCode === ResultCodeEnum.CaptchaRequired) {
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

	if(res.resultCode === ResultCodeEnum.Success) {
		dispatch( authActions.setAuthDataAC({
			login: null,
			email: null,
			id: null,
		}, false) );
		dispatch( setMyProfileInfo(null) );
	}
}

export default authReducer;