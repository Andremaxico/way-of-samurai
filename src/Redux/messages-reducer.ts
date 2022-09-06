import { chatAPI } from './../api/chatApi';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { InferActionsType, RootStateType } from './redux-store';
import { UserInfoType, MessageDataType } from "../types/types";
//================STATE, TYPES================

export type MessagesStateType = {
	usersInfo: Array<UserInfoType>,
	messagesData: Array<MessageDataType> | [],
	newMessageValue: string,
}


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

type ActionType = InferActionsType<typeof messagesActions>;
type ThunkType = ThunkAction<void, RootStateType, unknown, ActionType>;
type DispatchType = Dispatch<ActionType | ThunkType>;

const messagesReducer = (state = initalState, action: ActionType) => {
	//add post
	switch (action.type) {
		case 'MESSAGES_RECEIVED': 
			return {
				...state, messagesData: [...action.data],
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

	messagesReceived: (data: Array<MessageDataType>) => ({
		type: 'MESSAGES_RECEIVED',
		data,
	} as const ),

	//remove message from state
	deleteMessage: (messageId: number) => ({
		type: 'DELETE_MESSAGE',
		messageId,
	} as const)
}


//==========================THUNKS================

let _onMessageReceive: ((messages: MessageDataType[]) => void) | null = null;

const onMessageReceiveCreator = (dispatch: DispatchType) => {
	console.log('on message receive creator');
	if(_onMessageReceive === null) {
		_onMessageReceive = (messages) => {
			console.log('on message receive function');
			dispatch(messagesActions.messagesReceived(messages));
		}		
	}

	return _onMessageReceive;
}

export const startMessagesListening = (): ThunkType => (dispatch: DispatchType): void => {
	console.log('thunk start message listening');
	chatAPI.createChannel();
	chatAPI.subscribe(onMessageReceiveCreator(dispatch));
}
export const stopMessagesListening = (): ThunkType => (dispatch: DispatchType): void => {
	chatAPI.unsubscribe(onMessageReceiveCreator(dispatch));
	chatAPI.close();
}
export const sendMessage = (message: string): ThunkType => (dispatch: DispatchType) => {
	chatAPI.sendMessage(message);
}

export default messagesReducer;