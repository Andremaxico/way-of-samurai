const SEND_MESSAGE = 'send-message';
const UPDATE_NEW_MESSAGE_VALUE = 'update-new-message-value';

const initialState = {
	messagesList: [
		{
			text: 'Hi',
			isMy: false,
			id: 1,
		},
		{
			text: 'Hi',
			isMy: true,
			id: 2,
		},
		{
			text: 'How are you?',
			isMy: true,
			id: 3,
		},
	],
	chatsData: [
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'Ivan',
			lastMessage: 'Me: How are you',
			sendDate: '19.05.2021',
			id: 1,
		},
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'David',
			lastMessage: 'Hawaya?',
			sendDate: '30.06.2021',
			id: 2,
		},
	],
	newMessageValue: '',
}

const messagesReducer = (state = initialState, action) => {
	const stateCopy = {...state};
	stateCopy.chatsData = [...state.chatsData];
	stateCopy.messagesList = [...state.messagesList];

	switch (action.type) {
		case SEND_MESSAGE:	
			const id = stateCopy.messagesList.length + 1;
			const text = stateCopy.newMessageValue;
			const newMessage = {
				text: text,
				isMy: true,
				id: id,
			}
			stateCopy.messagesList.push(newMessage);
			stateCopy.newMessageValue = '';

			break;
		case UPDATE_NEW_MESSAGE_VALUE: 
			stateCopy.newMessageValue = action.value;
			break;
		default:
			break;
	}

	return stateCopy;
}

export const sendMessageAction = () => {
	return {
		type: SEND_MESSAGE,
	}
}

export const updateNewMessageValueAction = (value) => {
	return {
		type: UPDATE_NEW_MESSAGE_VALUE,
		value: value,
	}
}

export default messagesReducer;