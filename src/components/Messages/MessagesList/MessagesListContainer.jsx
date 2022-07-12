import React from 'react';
import { connect } from 'react-redux';
import MessagesList from './MessagesList';

const mapStateToProps = (state) => {
	return {
		messagesData: state.messagesPage.messagesData
	}
}

const MessagesListContainer = connect(mapStateToProps)(MessagesList);

export default MessagesListContainer;