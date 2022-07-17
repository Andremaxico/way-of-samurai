const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_VALUE = 'UPDATE-NEW-POST-VALUE';
const SET_USER_PROFILE_INFO = 'set-user-profile-info';

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
	myProfileInfo: {
		name: 'Andriy Solomko',
		age: 13,
		avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
		coverUrl: 'https://www.trendycovers.com/covers/make_a_wish_facebook_cover_1484111405.jpg',
	},
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

export default profileReducer;