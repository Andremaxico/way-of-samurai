import { authAPI, profileAPI, usersAPI } from "../api/api";
import { setNetworkError } from "./app-reducer";
import { setMyProfileInfo, setMyStatus } from "./profile-reducer";
import { toggleIsFetchingAC } from "./users-reducer";

const SET_AUTH_DATA = 'auth/set-auth-data';

const initialState = {
	data: {
		login: null,
		email: null,
		id: null,
		isAuthed: false,
	},
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTH_DATA:
			return {
				...state,
				data: {...action.data, isAuthed: action.isAuthed},
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

export const unsetAuthData = () => {};

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
	} catch(e) {
		console.log(e.code);
		if	(e.code === "ERR_NETWORK") dispatch(setNetworkError(true))
	}
}

export const login = (data) => async (dispatch) => {
   const res = await authAPI.login(data);

	if(res.resultCode === 0) {
		dispatch( setAuthData() );
	} else if(res.resultCode === 1) {
		return res.messages[0];
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