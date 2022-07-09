const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_VALUE = 'UPDATE-NEW-POST-VALUE';

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

			state.postsData.unshift(newPostData);
			state.newPostText = '';

			break;

		case UPDATE_NEW_POST_VALUE:
			state.newPostText = action.value;
			break;
	}

	return state;
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

export default profileReducer;