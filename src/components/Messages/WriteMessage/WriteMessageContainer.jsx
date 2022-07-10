import React from 'react';
import { addMessageCreator, updateNewMessageValueCreator } from '../../../Redux/messages-reducer';
import WriteMessage from './WriteMessage';

const WriteMessageContainer = (props) => {
	const addMessage = (text, event) => {
		if(text.length > 0) {
			props.dispatch(addMessageCreator());
		}

		event.preventDefault();
	}

	const changeTextareaValue = event => {
		const value = event.target.value;
		const action = updateNewMessageValueCreator(value);
		props.dispatch(action);
	}
	return (
		<WriteMessage 
			onTextareaChange={changeTextareaValue} 
			onAddMessage={addMessage}
			newMessageValue={props.newMessageValue}
		/>);
}

export default WriteMessageContainer;