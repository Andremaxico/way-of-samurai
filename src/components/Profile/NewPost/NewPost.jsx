import React from 'react';
import classes from './NewPost.module.scss';
import { useForm } from 'react-hook-form';
import Textarea from '../../../UI/FormControls/Textarea';

export default function NewPost(props) {
	const { handleSubmit, resetField, watch, register, formState: { errors } } = useForm();

	const onSubmit = () => {
		props.addPost(watch('postText'));
		resetField('postText')
	};

	return (
		<form className={classes.NewPost} onSubmit={ handleSubmit( onSubmit ) }>
			<Textarea 
				validation={{maxLength: {value: 500, message: 'Your post too long'},
								minLength: {value: 2, message: 'Your message must have more than 1 symbol'}}} 
				name='postText' placeholder='text...' register={register} error={errors.postText}
			/>
			<button>Add Post</button>
		</form>
	)
}
