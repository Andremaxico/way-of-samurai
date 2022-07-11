import React from 'react';
import { addMessageCreator, updateNewMessageValueCreator } from '../../../Redux/messages-reducer';
import WriteMessage from './WriteMessage'; 
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		newMessageValue: state.messagesPage.newMessageValue,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateNewMessageValue: (value) => {
			const action = updateNewMessageValueCreator(value);
			debugger;
			dispatch(action);
		},
		addMessage: () => {
			const action = addMessageCreator();
			dispatch(action);
		}
	}
}

const WriteMessageContainer = connect(mapStateToProps, mapDispatchToProps)(WriteMessage);

export default WriteMessageContainer;