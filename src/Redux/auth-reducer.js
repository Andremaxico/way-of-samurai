import { authAPI, profileAPI, usersAPI, securityAPI } from "../api/api";
import { setNetworkError } from "./app-reducer";
import { setMyProfileInfo, setMyStatus } from "./profile-reducer";
import { toggleIsFetchingAC } from "./users-reducer";

const SET_AUTH_DATA = 'auth/set-auth-data';
const GET_CAPTCHA_URL_SUCCESSFUL = 'auth/get-capthca-url-successful';

const initialState = {
	data: {
		login: null,
		email: null,
		id: null,
		isAuthed: false,
	},
	captchaUrl: null,
}

const authReducer = (state = initialState, action) => {
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

//actionCreators
export const setAuthDataAC = (data, isAuthed) => {
	return {
		type: SET_AUTH_DATA,
		data,
		isAuthed,
	}
}

export const getCaptchaUrlSuccessful = (captcha) => {
	return {
		type: GET_CAPTCHA_URL_SUCCESSFUL,
		captcha,
	}
}


//thunks
export const setAuthData = () => async (dispatch) => {
	dispatch(toggleIsFetchingAC(true));
	try {
		const res = await authAPI.getAuthInfo();

		if(res.resultCode === 0) {
			//login, email, id
			dispatch(setAuthDataAC(res.data, true));
		}
	
		const data = await usersAPI.getUserById(res.data.id);
		if(data) {
			//all info
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

export const getCaptchaUrl = () => async (dispatch) => {
	const captcha = await securityAPI.getCaptchaUrl();
	if(captcha) dispatch(getCaptchaUrlSuccessful(captcha.url));
}

export const login = (data) => async (dispatch) => {
	try {
		const res = await authAPI.login(data);
		dispatch(setNetworkError(false));
		dispatch(getCaptchaUrlSuccessful(null));
		
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

export const logout = () => async (dispatch) => {
	const res = await authAPI.logout();

	if(res.resultCode === 0) {
		dispatch( setAuthDataAC(null, false) );
		dispatch( setMyProfileInfo(null) );
	}
}

export default authReducer;