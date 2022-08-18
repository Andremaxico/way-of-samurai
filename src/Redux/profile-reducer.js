import { profileAPI, usersAPI } from "../api/api";
import { setNetworkError } from "./app-reducer";
import { toggleIsFetchingAC } from "./users-reducer";
import { 
	getCaptchaUrl, getCaptchaUrlSuccessful, 
	setAuthData 
} from './auth-reducer';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_VALUE = 'UPDATE-NEW-POST-VALUE';
const SET_USER_PROFILE_INFO = 'set-user-profile-info';
const SET_MY_PROFILE_INFO = 'set-my-profile-info';
const SET_MY_STATUS = 'set-my-status';
const SET_CURR_USER_STATUS = 'set-curr-user-status';
const SET_AVATAR = 'set-avatar';
const SET_FORM_ERROR = 'profile/SET_FORM_ERROR';

const initialState = {
	postsData: [
		{
			text: 'Hi',
			likesCount: 0,
			id: 5,
		},
		{
			text: 'How are you?',
			likesCount: 0,
			id: 4,
		},
		{
			text: 'Where are you?',
			likesCount: 5,
			id: 3,
		},
		{
			text: 'Want to home?...',
			likesCount: 8,
			id: 2,
		},
		{
			text: 'Me too...:(',
			likesCount: 6,
			id: 1,
		},
	],
	myProfileInfo: null,
	currUserProfileInfo: null,
	myProfileFormError: null,
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			const id = state.postsData.length+1;
			const postText = action.newPostValue;
			const newPostData = {
				text: postText,
				likesCount: 0,
				id: id,
			}
			return {
				...state,
				postsData: [newPostData, ...state.postsData],
				newPostText: '',
			}
		case UPDATE_NEW_POST_VALUE:
			return {
				...state,
				newPostText: action.value,
			}
		case SET_USER_PROFILE_INFO:
			return {
				...state,
				currUserProfileInfo: action.userProfileInfo,
			}
		case SET_MY_PROFILE_INFO: 
			return {
				...state, 
				myProfileInfo: {...action.myProfileInfo,  isMyProfile: true},
			}
		case SET_MY_STATUS: 
			return {
				...state,
				myProfileInfo: {
					...state.myProfileInfo,
					aboutMe: action.newStatus,
				}
			}
		case SET_CURR_USER_STATUS:
			return {
				...state,
				currUserProfileInfo: {
					...state.currUserProfileInfo,
					aboutMe: action.newStatus,
				}
			}
		case SET_AVATAR: 
			return {
				...state,
				myProfileInfo: {
					...state.myProfileInfo,
					photos: {
						...action.photos
					}
				}
			}
		case SET_FORM_ERROR:
			return {
				...state,
				myProfileFormError: action.message,
			}
		default: {
			return state
		}
	}
}

//Action creators
export const addPost = (newPostValue) => {
	return {
		type: ADD_POST,
		newPostValue,
	}
}
export const setUserProfileInfo = (userProfileInfo) => {
	return {
		type: SET_USER_PROFILE_INFO,
		userProfileInfo,
	}
}
export const setMyProfileInfo = (myProfileInfo) => {
	return {
		type: SET_MY_PROFILE_INFO,
		myProfileInfo,
	}
}
export const setMyStatus = (newStatus) => {
	return {
		type: SET_MY_STATUS,
		newStatus,
	}
}
export const setAvatarSuccessful = (photos) => {
	return {
		type: SET_AVATAR,
		photos,
	}
}
export const setCurrUserStatus = (newStatus) => {
	return {
		type: SET_CURR_USER_STATUS,
		newStatus,
	}
}
export const setFormError = (message) => {
	return {
		type: SET_FORM_ERROR,
		message,
	}
}

//thunks creators
export const setUserById = (id) => async (dispatch) => {
	dispatch(toggleIsFetchingAC(true));
	//for disable fetching after request (in ProfileContiner.componentDidMount);
	try {
		const data = await usersAPI.getUserById(id);
		if(data) {
			dispatch(setUserProfileInfo(data));
		}
	
		const status = await profileAPI.getUserStatus(id);
		dispatch(setCurrUserStatus(status));
		dispatch(setNetworkError(false));
	
	} catch(e) {
		if(e.code === 'ERR_NETWORK') dispatch(setNetworkError(true))
	}
}

export const updateMyStatus = (newStatus) => async (dispatch) => {
	try {
		const resolve = await profileAPI.updateMyStatus(newStatus);
		if(resolve.resultCode === 0) {
			dispatch(setMyStatus(newStatus));
			dispatch(setNetworkError(false));
			dispatch(setFormError(null));
		} else {
			dispatch(setFormError(resolve.messages[0]));
		}
	} catch(e) {
		if(e.code === 'ERR_NETWORK') dispatch(setNetworkError(true))
	}
}

export const setUserStatus = (userId) => async (dispatch) => {
	const data = await profileAPI.getUserStatus(userId);
	dispatch(setCurrUserStatus(data.status));
}

export const setAvatar = (file) => async (dispatch) => {
	try {
		const res = await profileAPI.setAvatar(file);
		if(res.resultCode === 0) {
			dispatch(setAvatarSuccessful(res.data.photos));
		}
		dispatch(setNetworkError(false));
	} catch(e) {
		if(e.code === 'ERR_NETWORK') dispatch(setNetworkError(true));
	}
}

export const updateMyProfileData = (data) => async (dispatch) => {
	try {
		const res = await profileAPI.setMyProfileData(data);

		if(res.resultCode === 0) {
			await dispatch(updateMyStatus(data.aboutMe));
			dispatch(setAuthData());
			dispatch(getCaptchaUrlSuccessful(null));
		}
		dispatch(setNetworkError(false));
	} catch(e) {
		if(e.code === 'ERR_NETWORK') dispatch(setNetworkError(true));
	}
}
export default profileReducer;