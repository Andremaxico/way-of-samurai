import { AnyAction } from "redux";
import { UserInfoType, MessageDataType } from "../types/types";

//=================ACTION TYPES CONST=================
const ADD_MESSAGE = 'ADD-MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';

//================STATE, TYPES================

export type MessagesStateType = {
	usersInfo: Array<UserInfoType>,
	messagesData: Array<MessageDataType>,
	newMessageValue: string,
}

type ActionType = AddMessageActionType | DeleteMessageActionType;

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
	newMessageValue: '',
}

const messagesReducer = (state = initalState, action: ActionType) => {
	//add post
	switch (action.type) {
		case ADD_MESSAGE:
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
			}
		case DELETE_MESSAGE: 
			return {
				...state,
				messagesData: state.messagesData.filter(mess => mess.id !== action.messageId),
			}
		default:
			return state
	}
}

//==============ACTION CREATORS===========
//add message to state
type AddMessageActionType = {
	type: typeof ADD_MESSAGE,
	newMessageValue: string,
}

export const addMessage = (newMessageValue: string): AddMessageActionType => {
	return {
		type: ADD_MESSAGE,
		newMessageValue,
	}
}

//remove message from state
type DeleteMessageActionType = {
	type: typeof DELETE_MESSAGE,
	messageId: number,
}

export const deleteMessage = (messageId: number): DeleteMessageActionType => {
	return {
		type: DELETE_MESSAGE,
		messageId,
	}
}

export default messagesReducer;