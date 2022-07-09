const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_VALUE = 'UPDATE-NEW-POST-VALUE';

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

const profileReducer = (state, action) => {
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

export default profileReducer;