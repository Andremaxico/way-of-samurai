import * as React from 'react';
import { connect } from 'react-redux';
import MessagesList from './MessagesList';
import { MessageDataType } from '../../../types/types';
import { RootStateType } from '../../../Redux/redux-store';

export type MessagesListPropsType = {
	messagesData: Array<MessageDataType>,
}

const mapStateToProps = (state: RootStateType): MessagesListPropsType => {
	return {
		messagesData: state.messagesPage.messagesData
	}
}

const MessagesListContainer = connect<MessagesListPropsType>(mapStateToProps)(MessagesList);

export default MessagesListContainer;