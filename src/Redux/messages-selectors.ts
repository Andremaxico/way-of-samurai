import { RootStateType } from './redux-store';
export const selectMessagesData = (state: RootStateType) => {
	return state.messagesPage.messagesData;
}

export const selectWsStatus = (state: RootStateType) => {
	return state.messagesPage.status;
}