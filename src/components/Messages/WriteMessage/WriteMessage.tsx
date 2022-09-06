import * as React from 'react';
import classes from './WriteMessage.module.scss';
import { useForm } from 'react-hook-form';
import Textarea from '../../../UI/FormControls/Textarea';
import { useDispatch } from 'react-redux';
import { messagesActions, sendMessage } from '../../../Redux/messages-reducer';
import { AnyAction } from 'redux';

type PropsType = {}
type NewMessageFormType = {
	messageValue: string,
}

const WriteMessage: React.FC<PropsType> = ({}) => {
	const { register, resetField, handleSubmit, watch, formState: { errors } 
	} = useForm<NewMessageFormType>();

	const dispatch = useDispatch();
	const addMessage = (value: string) => {
		dispatch(sendMessage(value) as unknown as AnyAction);
	}

	const onSubmit = (data: NewMessageFormType) => {
		addMessage(data.messageValue);
		resetField('messageValue');
	};

	return (
		<form action='#' className={classes.form} onSubmit={ handleSubmit(onSubmit) }>
			<Textarea<keyof NewMessageFormType>
				validation={{ 
					maxLength: {value: 100, message: 'Cannot send message, length > 100'},
					minLength: {value: 2, message: 'You don`t type anything'},
				}}
				register={register} name='messageValue' className={classes.textarea}
				error={errors.messageValue} placeholder='Your message'
			/>
			<button disabled={false} className={classes.button}>Send</button>
		</form>
	)
}

export default WriteMessage;