import { authAPI, profileAPI, usersAPI } from "../api/api";
import { setMyProfileInfo, setMyStatus } from "./profile-reducer";
import { toggleIsFetchingAC } from "./users-reducer";

const SET_AUTH_DATA = 'set-auth-data';

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
export const setAuthData = () => (dispatch) => {
	dispatch(toggleIsFetchingAC(true));
	return authAPI.getAuthInfo()
	.then(res => {
		if(res.resultCode === 0) {
			//login, email, id
			dispatch(setAuthDataAC(res.data, true));
			return usersAPI.getUserById(res.data.id);
		}

	})
	.then(data => {
		if(data) {
			//all info
			dispatch(setMyProfileInfo(data));
			//return my status by my id
			return profileAPI.getUserStatus(data.userId);
		}
	})
	.then(status => {
		//change 'aboutMe' of myProfileInfo
		//set my status from server yo my profileData
		if(status && status.length > 0) dispatch(setMyStatus(status));
		dispatch(toggleIsFetchingAC(false));
	})
}

export const login = (data) => (dispatch) => {
   return authAPI.login(data).then(res => {
		if(res.resultCode === 0) {
         dispatch( setAuthData() );
		} else if(res.resultCode === 1) {
			return res.messages[0];
		}
	})
}

export const logout = () => (dispatch) => {
	authAPI.logout().then(res => {
		if(res.resultCode === 0) {
			dispatch( setAuthDataAC(null, false) );
			dispatch( setMyProfileInfo(null) );
		}
	})
}

export default authReducer;