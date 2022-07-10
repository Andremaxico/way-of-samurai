import React from 'react';
import { addMessageCreator, updateNewMessageValueCreator } from '../../../Redux/messages-reducer';
import classes from './WriteMessage.module.scss';


const WriteMessage = (props) => {
	const currentRef = React.createRef();
	const onAddMessage = (event) => {
		const text = currentRef.current.value;
		props.onAddMessage(text, event);
	}

	const onTextareaChange = event => {
		props.onTextareaChange(event);
	}
	return (
		<form action='#' className={classes.form} onSubmit={ onAddMessage }>
			<textarea onChange={ onTextareaChange } value={props.newMessageValue} ref={ currentRef } placeholder='Input your message...' className={classes.textarea} ref={currentRef}></textarea>
			<button className={classes.button}>Send</button>
		</form>
	)
}

export default WriteMessage;