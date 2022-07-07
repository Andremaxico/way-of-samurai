import React from 'react';
import classes from './WriteForm.module.scss';

export const WriteForm = (props) => {
	const currentRef = React.createRef();
	const addMessage = (event) => {
		const text = currentRef.current.value;
		props.addMessage(text);
		currentRef.current.value = '';
		
		event.preventDefault();
	}
	return (
		<form action='#' className={classes.form} onSubmit={ addMessage }>
			<textarea ref={ currentRef } placeholder='Input your message...' className={classes.textarea} ref={currentRef}></textarea>
			<button className={classes.button}>Send</button>
		</form>
	)
}
