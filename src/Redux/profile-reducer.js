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
	profileInfo: {
		name: 'Andriy Solomko',
		age: 13,
		avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
		coverUrl: 'https://www.trendycovers.com/covers/make_a_wish_facebook_cover_1484111405.jpg',
	},
	newPostText: '',
}

const profileReducer = (state = initialState, action) => {
	const stateCopy = {...state};
	switch (action.type) {
		case ADD_POST:
			const id = stateCopy.postsData.length+1;
			const postText = stateCopy.newPostText;
			const newPostData = {
				text: postText,
				likesCount: 0,
				id: id,
			}


			stateCopy.postsData = [...state.postsData];
			stateCopy.postsData.unshift(newPostData);
			stateCopy.newPostText = '';

			break;

		case UPDATE_NEW_POST_VALUE:
			stateCopy.newPostText = action.value;
			break;
	}

	return stateCopy;
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