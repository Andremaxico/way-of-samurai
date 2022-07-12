const UPDATE_NEW_POST_VALUE = 'update-new-post-value';
const ADD_POST = 'add-post';

const initialState = {
	profileInfo: {
		name: 'Andriy',
		avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
		age: 13,
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
	newPostValue: '',
}

const profileReducer = (state = initialState, action) => {
	const stateCopy = {...state};
	stateCopy.postsData = [...state.postsData];

	switch (action.type) {
		case ADD_POST:
			const value = stateCopy.newPostValue;
			const id = stateCopy.postsData.length + 1;
			const newPost = {
				text: value,
				likesCount: 0,
				id: id,
				avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			}

			stateCopy.postsData.push(newPost);
			console.log(stateCopy.postsData);
			stateCopy.newPostValue = '';

			break;
		case UPDATE_NEW_POST_VALUE:
			stateCopy.newPostValue = action.value;

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