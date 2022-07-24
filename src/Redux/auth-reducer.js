import { authAPI, profileAPI, usersAPI } from "../api/api";
import { setMyProfileInfo, setMyStatus,  updateMyStatus } from "./profile-reducer";
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
	dispatch( toggleIsFetchingAC(true) );
	authAPI.getAuthInfo().then(res => {
		if(res.resultCode === 0) {
			dispatch(setAuthDataAC(res.data));
			return usersAPI.getUserById(res.data.id);
		}

	})
	.then(data => {
		if(data) {
			dispatch(setMyProfileInfo(data));
			//return my status by my id
			return profileAPI.getUserStatus(data.userId);
		}
	})
	.then(status => {
		dispatch(toggleIsFetchingAC(false));
		//change 'aboutMe' of myProfileInfo
		if(status && status.length > 0) dispatch(setMyStatus(status));
	})
}

export const login = (data) => (dispatch) => {
	authAPI.login(data).then(res => {
		if(res.resultCode === 0) dispatch( setAuthData() );
	})
}

export default authReducer;