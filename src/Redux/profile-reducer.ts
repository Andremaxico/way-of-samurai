import { profileAPI, usersAPI } from "../api/api";
import { setNetworkError } from "./app-reducer";
import { toggleIsFetchingAC } from "./users-reducer";
import { 
	getCaptchaUrl, getCaptchaUrlSuccessful, 
	setAuthData 
} from './auth-reducer';
import { PostDataType, ProfileInfoType } from "../types/types";

//==================ACTIONS CONST==============
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_VALUE = 'UPDATE-NEW-POST-VALUE';
const SET_USER_PROFILE_INFO = 'set-user-profile-info';
const SET_MY_PROFILE_INFO = 'set-my-profile-info';
const SET_MY_STATUS = 'set-my-status';
const SET_CURR_USER_STATUS = 'set-curr-user-status';
const SET_AVATAR = 'set-avatar';
const SET_FORM_ERROR = 'profile/SET_FORM_ERROR';

//====================STATE, REDUCER===============

const initialState = {
	postsData: [{}] as Array<PostDataType>,
	myProfileInfo: {} as ProfileInfoType,
	currUserProfileInfo: {} as ProfileInfoType,
	myProfileFormError: null as string | null
}

export type ProfileStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): ProfileStateType => {
	switch (action.type) {
		case ADD_POST:
			const id = state.postsData.length+1;
			const postText = action.newPostValue;
			const newPostData: PostDataType = {
				text: postText,
				likesCount: 0,
				id: id,
			}
			return {
				...state,
				postsData: [newPostData, ...state.postsData],
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

//===============ACTION CREATORS===============
//add post to state
type AddPostActionType = {
	type: typeof ADD_POST,
	newPostValue: string,
}
export const addPost = (newPostValue: string): AddPostActionType => {
	return {
		type: ADD_POST,
		newPostValue,
	}
}

//set another profile info
type SetUserProfileInfoActionType = {
	type: typeof SET_USER_PROFILE_INFO,
	userProfileInfo: any,
}
export const setUserProfileInfo = (userProfileInfo: any): SetUserProfileInfoActionType => {
	return {
		type: SET_USER_PROFILE_INFO,
		userProfileInfo,
	}
}

//set my profile info
type SetMyProfileInfoActionType = {
	type: typeof SET_MY_PROFILE_INFO,
	myProfileInfo: any,
}
export const setMyProfileInfo = (myProfileInfo: any): SetMyProfileInfoActionType => {
	return {
		type: SET_MY_PROFILE_INFO,
		myProfileInfo,
	}
}

//set my status
type SetMyStatusActionType = {
	type: typeof SET_MY_STATUS,
	newStatus: string,
}
export const setMyStatus = (newStatus: string): SetMyStatusActionType => {
	return {
		type: SET_MY_STATUS,
		newStatus,
	}
}

//set avatar success
type SetAvatarSuccessfulActionType = {
	type: typeof SET_AVATAR,
	photos: any,
}

export const setAvatarSuccessful = (photos: any): SetAvatarSuccessfulActionType => {
	return {
		type: SET_AVATAR,
		photos,
	}
}

//set current(another) user status
type SetCurrUserStatusActionType = {
	type: typeof SET_CURR_USER_STATUS,
	newStatus: string,
}

export const setCurrUserStatus = (newStatus: string): SetCurrUserStatusActionType => {
	return {
		type: SET_CURR_USER_STATUS,
		newStatus,
	}
}

//set form error
type SetFormErrorActionType = {
	type: typeof SET_FORM_ERROR,
	message: string,
}

export const setFormError = (message: string): SetFormErrorActionType => {
	return {
		type: SET_FORM_ERROR,
		message,
	}
}

//===================THUNKS CREATORS====================
export const setUserById = (id: number) => async (dispatch: any) => {
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

export const updateMyStatus = (newStatus: string) => async (dispatch: any) => {
	try {
		const resolve = await profileAPI.updateMyStatus(newStatus);
		if(resolve.resultCode === 0) {
			dispatch(setMyStatus(newStatus));
			dispatch(setNetworkError(false));
			dispatch(setFormError(''));
		} else {
			dispatch(setFormError(resolve.messages[0]));
		}
	} catch(e) {
		if(e.code === 'ERR_NETWORK') dispatch(setNetworkError(true))
	}
}

export const setUserStatus = (userId: number) => async (dispatch: any) => {
	const data = await profileAPI.getUserStatus(userId);
	dispatch(setCurrUserStatus(data.status));
}

export const setAvatar = (file: any) => async (dispatch: any) => {
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

export const updateMyProfileData = (data: any) => async (dispatch: any) => {
	try {
		const res = await profileAPI.setMyProfileData(data);

		if(res.resultCode === 0) {
			await dispatch(updateMyStatus(data.aboutMe));
			dispatch(setAuthData());
			dispatch(getCaptchaUrlSuccessful(''));
		}
		dispatch(setNetworkError(false));
	} catch(e) {
		if(e.code === 'ERR_NETWORK') dispatch(setNetworkError(true));
	}
}
export default profileReducer;