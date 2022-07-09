import React from 'react';
import { addMessageCreator, updateNewMessageValueCreator } from '../../../Redux/messages-reducer';
import classes from './WriteMessage.module.scss';

export const WriteForm = (props) => {
	const currentRef = React.createRef();
	const addMessage = (event) => {
		const text = currentRef.current.value;
		if(text.length > 0) {
			props.dispatch(addMessageCreator());
		}

		event.preventDefault();
	}

	const changeTextareaValue = event => {
		const value = event.target.value;
		props.dispatch(updateNewMessageValueCreator(value));
	}
	return (
		<form action='#' className={classes.form} onSubmit={ addMessage }>
			<textarea onChange={changeTextareaValue} value={props.newMessageValue} ref={ currentRef } placeholder='Input your message...' className={classes.textarea} ref={currentRef}></textarea>
			<button className={classes.button}>Send</button>
		</form>
	)
}
