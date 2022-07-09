import React from 'react';
import { addMessageActionCreator, updateNewMessageValueActionCreator } from '../../../Redux/state';
import classes from './WriteForm.module.scss';

export const WriteForm = (props) => {
	const currentRef = React.createRef();
	const addMessage = (event) => {
		const text = currentRef.current.value;
		if(text.length > 0) {
			props.dispatch(addMessageActionCreator());
		}

		event.preventDefault();
	}

	const changeTextareaValue = event => {
		const value = event.target.value;
		props.dispatch(updateNewMessageValueActionCreator(value));
	}
	return (
		<form action='#' className={classes.form} onSubmit={ addMessage }>
			<textarea onChange={changeTextareaValue} value={props.newMessageValue} ref={ currentRef } placeholder='Input your message...' className={classes.textarea} ref={currentRef}></textarea>
			<button className={classes.button}>Send</button>
		</form>
	)
}
