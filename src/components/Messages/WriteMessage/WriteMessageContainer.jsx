import React from 'react';
import { addMessage } from '../../../Redux/messages-reducer';
import WriteMessage from './WriteMessage'; 
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		newMessageValue: state.messagesPage.newMessageValue,
	}
}

const WriteMessageContainer = connect(mapStateToProps, {addMessage})(WriteMessage);

export default WriteMessageContainer;