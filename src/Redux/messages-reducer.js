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
	newMessageValue: '',
}

const messagesReducer = (state = initalState, action) => {
	const stateCopy = {...state};

	//stateCopy.usersInfo = [...state.usersInfo];
	//add post
	switch (action.type) {
		case ADD_MESSAGE:
			const messageText = stateCopy.newMessageValue;
			const newMessageData = {
				text: messageText,
				isMy: true,
			}
			stateCopy.messagesData = [...state.messagesData];
			stateCopy.messagesData.push(newMessageData);

			stateCopy.newMessageValue = '';
			break;
	
		case UPDATE_NEW_MESSAGE_VALUE:
			stateCopy.newMessageValue = action.value;
			break;
	}
	return stateCopy;
}

//Action creators
export const addMessageCreator = () => {
	return {
		type: ADD_MESSAGE,
	}
}
export const updateNewMessageValueCreator = (value) => {
	return {
		type: UPDATE_NEW_MESSAGE_VALUE,
		value: value
	}
}


export default messagesReducer;