import { profileAPI, usersAPI } from "../api/api";
import { toggleIsFetchingAC } from "./users-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_VALUE = 'UPDATE-NEW-POST-VALUE';
const SET_USER_PROFILE_INFO = 'set-user-profile-info';
const SET_MY_PROFILE_INFO = 'set-my-profile-info';
const SET_MY_STATUS = 'set-my-status';
const SET_CURR_USER_STATUS = 'set-curr-user-status';

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
				myProfileInfo: {...action.myProfileInfo, isMyProfile: true},
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
export const setCurrUserStatus = (newStatus) => {
	return {
		type: SET_CURR_USER_STATUS,
		newStatus,
	}
}

//thunks creators
export const setUserById = (id) => async (dispatch) => {
	dispatch(toggleIsFetchingAC(true));
	//for disable fetching after request (in ProfileContiner.componentDidMount);
	return usersAPI.getUserById(id).then(data => {
		if(data) {
			dispatch(setUserProfileInfo(data));
			return profileAPI.getUserStatus(id);
		}
	}).then(status => {
		dispatch(setCurrUserStatus(status));
	})
}

export const updateMyStatus = (newStatus) => (dispatch) => {
	profileAPI.updateMyStatus(newStatus).then(res => {
		if(res.resultCode === 0) {
			dispatch(setMyStatus(newStatus));
		}
	})
}


export const setUserStatus = (userId) => (dispatch) => {
	profileAPI.getUserStatus(userId).then(data => {
		dispatch(setCurrUserStatus(data.status));
	});
}

export default profileReducer;