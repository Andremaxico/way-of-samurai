const UPDATE_NEW_POST_VALUE = 'update-new-post-value';
const ADD_POST = 'add-post';

const initialState = {
	profileInfo: {
		name: 'Andriy',
		age: 13,
		coverUrl: 'https://timelinecovers.pro/facebook-cover/download/life-cycle-facebook-cover.jpg',
		avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
	},
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
	const stateCopy = {...state};
	stateCopy.postsData = [...state.postsData];

	switch (action.type) {
		case ADD_POST:
			const value = stateCopy.newPostText;
			const id = stateCopy.postsData.length + 1;
			const newPost = {
				text: value,
				likesCount: 0,
				id: id,
				avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			}

			stateCopy.postsData.unshift(newPost);
			stateCopy.newPostText = '';

			break;
		case UPDATE_NEW_POST_VALUE:
			stateCopy.newPostText = action.value;

			break;
	}

	return stateCopy;
}

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

export default profileReducer;