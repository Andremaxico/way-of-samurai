import React from 'react';
import classes from './WriteMessage.module.scss';
import { useForm } from 'react-hook-form';

const WriteMessage = (props) => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();

	const onSubmit = () => props.addMessage(watch('message'));

	return (
		<form action='#' className={classes.form} onSubmit={ handleSubmit(onSubmit) }>
			<textarea 
				{...register('message', {minLength: 1})}
				placeholder='Input your message...' className={classes.textarea}
			></textarea>
			<button className={classes.button}>Send</button>
		</form>
	)
}

export default WriteMessage;