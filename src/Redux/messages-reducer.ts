import { InferActionsType } from './redux-store';
import { UserInfoType, MessageDataType } from "../types/types";
//================STATE, TYPES================

export type MessagesStateType = {
	usersInfo: Array<UserInfoType>,
	messagesData: Array<MessageDataType> | [],
	newMessageValue: string,
}

type ActionType = InferActionsType<typeof messagesActions>;

const initalState: MessagesStateType = {
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
	messagesData: [],
	newMessageValue: '',
}

const messagesReducer = (state = initalState, action: ActionType) => {
	//add post
	switch (action.type) {
		case 'SET_MESSAGES_DATA': 
			return {
				...state, messagesData: [...state.messagesData, ...action.data],
			}
		/*case 'ADD_MESSAGE':
			const messageText = action.newMessageValue;
			const id = state.messagesData.length+1;
			const newMessageData: MessageDataType = {
				text: messageText,
				isMy: true,
				id: id,
			}

			return {
				...state,
				messagesData: [...state.messagesData, newMessageData],
				newMessageValue: '',
			}*/
		/*case 'DELETE_MESSAGE': 
			return {
				...state,
				messagesData: state.messagesData.filter(mess => mess.id !== action.messageId),
			}*/
		default:
			return state
	}
}

//==============ACTION CREATORS===========
export const messagesActions = {
	//add message to state
	addMessage: (newMessageValue: string) => ({
		type: 'ADD_MESSAGE',
		newMessageValue,
	} as const),

	setMessagesData: (data: Array<MessageDataType>) => ({
		type: 'SET_MESSAGES_DATA',
		data,
	} as const ),

	//remove message from state
	deleteMessage: (messageId: number) => ({
		type: 'DELETE_MESSAGE',
		messageId,
	} as const)
}

export default messagesReducer;