import React from 'react';
import classes from './WriteMessage.module.scss';


const WriteMessage = (props) => {
	const onAddMessage = (event) => {
		props.addMessage();
		event.preventDefault();
	}

	const onTextareaChange = event => {
		const text = event.target.value;
		props.updateNewMessageValue(text);
	}
	return (
		<form action='#' className={classes.form} onSubmit={ onAddMessage }>
			<textarea onChange={ onTextareaChange } value={props.newMessageValue} placeholder='Input your message...' className={classes.textarea}></textarea>
			<button className={classes.button}>Send</button>
		</form>
	)
}

export default WriteMessage;