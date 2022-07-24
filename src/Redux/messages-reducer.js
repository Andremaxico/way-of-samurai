const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_VALUE = 'UPDATE-NEW-MESSAGE-VALUE';

const initalState = {
	usersInfo: [
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'Andriy',
			id: 1,
		},
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'Ivan',
			id: 2,
		},
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'Vasya',
			id: 3,
		},
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'David',
			id: 4,
		},
	],
	messagesData: [
		{
			text: 'Hi',
			isMy: true,
		},
		{
			text: 'How are you?',
			isMy: true,
		},
		{
			text: 'Where are you?',
			isMy: false,
		},
		{
			text: 'Want to home?...',
			isMy: true,
		},
		{
			text: 'Me too...:(',
			isMy: false,
		},
	],
}

const messagesReducer = (state = initalState, action) => {
	//add post
	switch (action.type) {
		case ADD_MESSAGE:
			const messageText = action.newMessageValue;
			const newMessageData = {
				text: messageText,
				isMy: true,
			}

			return {
				...state,
				messagesData: [...state.messagesData, newMessageData],
				newMessageValue: '',
			}
		default:
			return state
	}
}

//Action creators
export const addMessage = (newMessageValue) => {
	return {
		type: ADD_MESSAGE,
		newMessageValue,
	}
}


export default messagesReducer;