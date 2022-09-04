import { RootStateType } from './redux-store';
export const selectMessagesData = (state: RootStateType) => {
	return state.messagesPage.messagesData;
}