import { usersAPI } from "../api/api";
import { toggleIsFetchingAC } from "./users-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_VALUE = 'UPDATE-NEW-POST-VALUE';
const SET_USER_PROFILE_INFO = 'set-user-profile-info';
const SET_MY_PROFILE_INFO = 'set-my-profile-info';

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
	myProfileInfo: {},
	currUserProfileInfo: {},
	newPostText: '',
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			const id = state.postsData.length+1;
			const postText = state.newPostText;
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
				myProfileInfo: action.myProfileInfo,
			}
		default: {
			return state
		}
	}
}

//Action creators
export const addPostCreator = () => {
	return {
		type: ADD_POST,
	}
}
export const updateNewPostValueCreator = (value) => {
	return {
		type: UPDATE_NEW_POST_VALUE,
		value: value
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

//thunks creators
export const getUserById = (id) => (dispatch) => {
	dispatch(toggleIsFetchingAC(true));

	return usersAPI.getUserById(id).then(data => {
		dispatch(setUserProfileInfo(data));
	});
}


export default profileReducer;