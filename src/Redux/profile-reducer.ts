import { ResultCodeEnum, PhotosType } from './../types/types';
import { profileAPI } from "../api/profileApi";
import { usersAPI } from "../api/usersApi";
import { appActions } from "./app-reducer";
import { usersActions } from "./users-reducer";
import { authActions, setAuthData, getCaptchaUrl } from './auth-reducer';
import { PostDataType, ProfileInfoType } from "../types/types";
import { InferActionsType, RootStateType } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "react";

//==================ACTIONS CONST==============
//===============ACTION CREATORS===============

export const profileActions = {
	//add post to state
	addPost: (newPostValue: string) => ({
		type: 'ADD_POST',
		newPostValue: newPostValue,
	} as const),

	//set another profile info
	setUserProfileInfo: (userProfileInfo: ProfileInfoType) => ({
		type: 'SET_USER_PROFILE_INFO',
		userProfileInfo,
	} as const),

	//set my profile info
	setMyProfileInfo: (myProfileInfo: ProfileInfoType | null) => ({
		type: 'SET_MY_PROFILE_INFO',
		myProfileInfo,
	} as const),

	//set my status
	setMyStatus: (newStatus: string) => ({
		type: 'SET_MY_STATUS',
		newStatus,
	} as const),

	//set avatar success
	setAvatarSuccessful: (photos: PhotosType) => ({
		type: 'SET_AVATAR',
		photos,
	} as const),

	//set current(another) user status
	setCurrUserStatus: (newStatus: string) => ({
		type: 'SET_CURR_USER_STATUS',
		newStatus,
	} as const),

	//set form error
	setFormError: (message: string) => ({type: 'SET_FORM_ERROR', message,} as const),
}
//====================STATE, REDUCER===============

const initialState = {
	postsData: [{}] as Array<PostDataType>,
	myProfileInfo: {} as ProfileInfoType ,
	currUserProfileInfo: {} as ProfileInfoType,
	myProfileFormError: null as string | null
}

export type ProfileStateType = typeof initialState;
const { getCaptchaUrlSuccessful } = authActions;
const { setNetworkError } = appActions;
const { toggleIsFetchingAC } = usersActions;

type ImportedActionsType = ReturnType<typeof getCaptchaUrlSuccessful> | ReturnType<typeof setNetworkError> |
									ReturnType<typeof toggleIsFetchingAC>;

type ProfileActionsType = InferActionsType<typeof profileActions>;

type ThunkType = ThunkAction<void, RootStateType, unknown, ProfileActionsType>; 
type DispatchType = Dispatch<ProfileActionsType | ThunkType | ImportedActionsType>;

const profileReducer = (state = initialState, action: ProfileActionsType): ProfileStateType => {
	switch (action.type) {
		case 'ADD_POST':
			const id = state.postsData.length+1;
			const postText = action.type;
			const newPostData: PostDataType = {
				text: postText,
				likesCount: 0,
				id: id,
			}
			return {
				...state,
				postsData: [newPostData, ...state.postsData],
			}
		case 'SET_USER_PROFILE_INFO':
			return {
				...state,
				currUserProfileInfo: action.userProfileInfo,
			}
		case 'SET_MY_PROFILE_INFO': 
			console.log('action', action.myProfileInfo);
			const info: ProfileInfoType = Object.assign({isMyProfile: true}, action.myProfileInfo);
			console.log(info);
			return {
				...state, 
				myProfileInfo: info,
			}
		case 'SET_MY_STATUS': 
			return {
				...state,
				myProfileInfo: {
					...state.myProfileInfo,
					aboutMe: action.newStatus,
				}
			}
		case 'SET_CURR_USER_STATUS':
			return {
				...state,
				currUserProfileInfo: {
					...state.currUserProfileInfo,
					aboutMe: action.newStatus,
				}
			}
		case 'SET_AVATAR': 
			return {
				...state,
				myProfileInfo: {
					...state.myProfileInfo,
					photos: {
						...action.photos
					}
				}
			}
		case 'SET_FORM_ERROR':
			return {
				...state,
				myProfileFormError: action.message,
			}
		default: {
			return state
		}
	}
}

//===================THUNKS CREATORS=========================================================

export const setUserById = (id: number): ThunkType => async (dispatch: DispatchType) => {
	dispatch(toggleIsFetchingAC(true));

	console.log('get user by id: ', id)
	//for disable fetching after request (in ProfileContiner.componentDidMount);
	try {
		const data = await usersAPI.getUserById(id);
		console.log('userData', data);
		if(data) {
			dispatch(profileActions.setUserProfileInfo(data.data));
		}
	
		const status = await profileAPI.getUserStatus(id);
		dispatch(profileActions.setCurrUserStatus(status));
		dispatch(setNetworkError(false));
	
	} catch(e) {
		if(e.code === 'ERR_NETWORK') dispatch(setNetworkError(true))
	}
}

export const updateMyStatus = (newStatus: string): ThunkType => async (dispatch: DispatchType) => {
	try {
		const resolve = await profileAPI.updateMyStatus(newStatus);
		if(resolve.resultCode === ResultCodeEnum.Success) {
			dispatch(profileActions.setMyStatus(newStatus));
			dispatch(setNetworkError(false));
			dispatch(profileActions.setFormError(''));
		} else {
			dispatch(profileActions.setFormError(resolve.messages[0]));
		}
	} catch(e) {
		if(e.code === 'ERR_NETWORK') dispatch(setNetworkError(true))
	}
}

export const setUserStatus = (userId: number): ThunkType => async (dispatch: DispatchType) => {
	const data = await profileAPI.getUserStatus(userId);
	dispatch(profileActions.setCurrUserStatus(data.status));
}

export const setAvatar = (file: any): ThunkType => async (dispatch: DispatchType) => {
	try {
		const res = await profileAPI.setAvatar(file);
		if(res.resultCode === ResultCodeEnum.Success) {
			dispatch(profileActions.setAvatarSuccessful(res.data.photos));
		}
		dispatch(setNetworkError(false));
	} catch(e) {
		if(e.code === 'ERR_NETWORK') dispatch(setNetworkError(true));
	}
}

export const updateMyProfileData = (data: any): ThunkType => async (dispatch: DispatchType) => {
	try {
		const res = await profileAPI.setMyProfileData(data);

		if(res.resultCode === ResultCodeEnum.Success) {
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