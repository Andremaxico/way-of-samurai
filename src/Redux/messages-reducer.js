const ADD_MESSAGE = 'ADD-MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';

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
			id: 1
		},
		{
			text: 'How are you?',
			isMy: true,
			id: 2
		},
		{
			text: 'Where are you?',
			isMy: false,
			id: 3
		},
		{
			text: 'Want to home?...',
			isMy: true,
         id: 4
		},
		{
			text: 'Me too...:(',
			isMy: false,
			id: 5,
		},
	],
}

const messagesReducer = (state = initalState, action) => {
	//add post
	switch (action.type) {
		case ADD_MESSAGE:
			const messageText = action.newMessageValue;
			const id = state.messagesData.length+1;
			const newMessageData = {
				text: messageText,
				isMy: true,
				id: id,
			}

			return {
				...state,
				messagesData: [...state.messagesData, newMessageData],
				newMessageValue: '',
			}
		case DELETE_MESSAGE: 
		console.log('delete message');
			return {
				...state,
				messagesData: state.messagesData.filter(mess => mess.id !== action.messageId),
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

export const deleteMessage = (messageId) => {
	return {
		type: DELETE_MESSAGE,
		messageId,
	}
}

export default messagesReducer;