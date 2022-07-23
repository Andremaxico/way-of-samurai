import { toggleIsFetching } from './usersReducer';
import { usersAPI } from '../api/api';

const UPDATE_NEW_POST_VALUE = 'update-new-post-value';
const ADD_POST = 'add-post';
const SET_CURRENT_USER_PROFILE_DATA = 'set-current-user-profile-data';
const SET_MY_PROFILE_DATA = 'set-my-profile-data';

const initialState = {
	myProfileData: {},
	currentUserProfileData: {},
	postsData: [
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			text: 'Howaya?',
			likesCount: 3,
			id: 3,
		},
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			text: 'Yama Andriy',
			likesCount: 2,
			id: 2,
		},
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			text: 'Yoy',
			likesCount: 0,
			id: 1,
		},
	],
	newPostText: '',
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			const value = state.newPostText;
			const id = state.postsData.length + 1;
			const newPost = {
				text: value,
				likesCount: 0,
				id: id,
				avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			}

			return {
				...state, 
				postsData: state.postsData.unshift(newPost),
				newPostText: '',
			}
		case UPDATE_NEW_POST_VALUE:
			return {
				...state,
				newPostText: action.value,
			}
		case SET_MY_PROFILE_DATA: 
			return {
				...state,
				myProfileData: action.profileData,
			}
		case SET_CURRENT_USER_PROFILE_DATA:
			return {
				...state,
				currentUserProfileData: action.profileData,
			}
		default: 
			return state;
	}
}

//action creators
export const addPostAction = () => {
	return {
		type: ADD_POST,
	}
}

export const updateNewPostValueAction = (value) => {
	return {
		type: UPDATE_NEW_POST_VALUE,
		value: value
	}
}

export const setCurrentUserProfileDataAC = (profileData) => {
	return {
		type: SET_CURRENT_USER_PROFILE_DATA,
		profileData,
	}
}

export const setMyProfileData = (profileData) => {
	return {
		type: SET_MY_PROFILE_DATA,
		profileData,
	}
}


//thunk creator
export const setUserProfileData = (userId) => (dispatch) => {
	
	dispatch(toggleIsFetching(true));

	usersAPI.getUserById(userId).then(data => {
		if(data) {
			dispatch(setCurrentUserProfileDataAC(data));
		}
		dispatch(toggleIsFetching(false));
	});
}
export default profileReducer;