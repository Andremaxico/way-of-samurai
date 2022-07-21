import { authAPI, usersAPI } from "../api/api";
import { setMyProfileInfo } from "./profile-reducer";

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
		console.log('result', res.resultCode);
		if(res.resultCode === 0) {
			dispatch(setAuthDataAC(res.data));
			return usersAPI.getUserById(res.data.id);
		}

	})
	.then(data => {
		if(data) dispatch(setMyProfileInfo(data));
	})
}

export default authReducer;