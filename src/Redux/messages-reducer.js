const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_VALUE = 'UPDATE-NEW-MESSAGE-VALUE';

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

const messagesReducer = (state, action) => {
	//add post
	switch (action.type) {
		case ADD_MESSAGE:
			const messageText = state.newMessageValue;
			const newMessageData = {
				text: messageText,
				isMy: true,
			}
		
			state.messagesData.push(newMessageData);
			state.newMessageValue = '';
			break;
	
		case UPDATE_NEW_MESSAGE_VALUE:
			state.newMessageValue = action.value;
			break;
	}
	return state;
}

export default messagesReducer;