import React from 'react';
import classes from './WriteMessage.module.scss';


const WriteMessage = (props) => {
	const currentRef = React.createRef();
	const onAddMessage = (event) => {
		const text = currentRef.current.value;
		props.addMessage(text);
		event.preventDefault();
	}

	const onTextareaChange = event => {
		const text = event.target.value;
		props.updateNewMessageValue(text);
	}
	debugger;
	return (
		<form action='#' className={classes.form} onSubmit={ onAddMessage }>
			<textarea onChange={ onTextareaChange } value={props.newMessageValue} ref={ currentRef } placeholder='Input your message...' className={classes.textarea} ref={currentRef}></textarea>
			<button className={classes.button}>Send</button>
		</form>
	)
}

export default WriteMessage;