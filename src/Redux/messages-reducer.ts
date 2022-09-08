import { chatAPI, OnMessageSubscriberType, OnStatusChangeSubscriberType, StatusType } from './../api/chatApi';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { InferActionsType, RootStateType } from './redux-store';
import { UserInfoType, MessageDataType } from "../types/types";

import { v1 } from 'uuid';
//================STATE, TYPES================

export type MessagesStateType = {
	usersInfo: Array<UserInfoType>,
	messagesData: Array<MessageDataType> | [],
	newMessageValue: string,
	status: StatusType,
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
	status: 'pending',
}

type ActionType = InferActionsType<typeof messagesActions>;
type ThunkType = ThunkAction<void, RootStateType, unknown, ActionType>;
type DispatchType = Dispatch<ActionType | ThunkType>;

const messagesReducer = (state = initalState, action: ActionType): MessagesStateType => {
	//add post
	switch (action.type) {
		case 'MESSAGES_RECEIVED': 
			const arr = [...state.messagesData, ...action.data.map(m => ({...m, id: v1()}))];
			console.log('messages after encoding', arr);
			const newMessages = arr.length > 100 ? arr : arr.filter((m, i, array) => i > array.length - 100);
			console.log(newMessages);
			return {
				...state, messagesData: newMessages,
			}
		case 'chat/STATUS_CHANGED': 
			return {
				...state, status: action.status,
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

	statusChanged: (status: StatusType) => ({
		type: 'chat/STATUS_CHANGED',
		status,
	} as const),

	//remove message from state
	deleteMessage: (messageId: number) => ({
		type: 'DELETE_MESSAGE',
		messageId,
	} as const)
}


//==========================THUNKS================

let _onMessageReceive: OnMessageSubscriberType | null = null;
let _onStatusChange: OnStatusChangeSubscriberType | null = null;

const onMessageReceiveCreator = (dispatch: DispatchType) => {
	if(_onMessageReceive === null) {
		_onMessageReceive = (messages) => {
			dispatch(messagesActions.messagesReceived(messages));
		}		
	}

	return _onMessageReceive;
}
const onStatusChangeCreator = (dispatch: DispatchType) => {
	if(_onStatusChange === null) {
		_onStatusChange = (status) => {
			dispatch(messagesActions.statusChanged(status));
		}		
	}

	return _onStatusChange;
}

export const startMessagesListening = (): ThunkType => (dispatch: DispatchType): void => {
	chatAPI.createChannel();
	chatAPI.subscribe('messages-sub', onMessageReceiveCreator(dispatch));
	chatAPI.subscribe('status-sub', onStatusChangeCreator(dispatch));
}

export const stopMessagesListening = (): ThunkType => (dispatch: DispatchType): void => {
	chatAPI.unsubscribe('messages-sub', onMessageReceiveCreator(dispatch));
	chatAPI.unsubscribe('status-sub', onStatusChangeCreator(dispatch));
	chatAPI.close();
}
export const sendMessage = (message: string): ThunkType => (dispatch: DispatchType) => {
	chatAPI.sendMessage(message);
}

export default messagesReducer;