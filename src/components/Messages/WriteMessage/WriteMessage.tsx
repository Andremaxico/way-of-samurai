import * as React from 'react';
import classes from './WriteMessage.module.scss';
import { useForm } from 'react-hook-form';
import Textarea from '../../../UI/FormControls/Textarea';

type PropsType = {
	addMessage: (value: string) => void,
}

const WriteMessage: React.FC<PropsType> = (props) => {
	const { register, resetField, handleSubmit, watch, formState: { errors } } = useForm();

	const onSubmit = () => {
		props.addMessage(watch('messageValue'))
		resetField('message');
	};

	return (
		<form action='#' className={classes.form} onSubmit={ handleSubmit(onSubmit) }>
			<Textarea 
				validation={{ 
					maxLength: {value: 100, message: 'Cannot send message, length > 100'},
					minLength: {value: 2, message: 'You don`t type anything'},
				}}
				register={register} name='messageValue' className={classes.textarea}
				error={errors.messageValue}
			/>
			<button className={classes.button}>Send</button>
		</form>
	)
}

export default WriteMessage;