import { authAPI, profileAPI, usersAPI } from "../api/api";
import { setMyProfileInfo, setMyStatus,  updateMyStatus } from "./profile-reducer";

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
				data: {...action.data, isAuthed: true},
			}
	
		default:
			return state
	}
}

//actionCreators
export const setAuthDataAC = (data) => {
	return {
		type: SET_AUTH_DATA,
		data,
	}
}

//thunks
export const setAuthData = () => (dispatch) => {
	authAPI.getAuthInfo().then(res => {
		if(res.resultCode === 0) {
			dispatch(setAuthDataAC(res.data));
			return usersAPI.getUserById(res.data.id);
		}

	})
	.then(data => {
		if(data) {
			dispatch(setMyProfileInfo(data));
			return profileAPI.getUserStatus(data.userId);
		}
	})
	.then(status => {
		if(status.length > 0) dispatch(setMyStatus(status));
	})
}

export default authReducer;