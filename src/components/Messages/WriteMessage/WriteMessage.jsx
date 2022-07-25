import React from 'react';
import classes from './WriteMessage.module.scss';
import { useForm } from 'react-hook-form';
import Textarea from '../../../UI/FormControls/Textarea';

const WriteMessage = (props) => {
	const { register, resetField, handleSubmit, watch, formState: { errors } } = useForm();

	const onSubmit = () => {
		props.addMessage(watch('message'))
		resetField('message');
	};

	return (
		<form action='#' className={classes.form} onSubmit={ handleSubmit(onSubmit) }>
			<Textarea 
				validation={{ 
					maxLength: {value: 100, message: 'Cannot send message, length > 100'},
					minLength: {value: 2, message: 'You don`t type anything'},
				}}
				register={register} name='message' className={classes.textarea}
				error={errors.message}
			/>
			<button className={classes.button}>Send</button>
		</form>
	)
}

export default WriteMessage;