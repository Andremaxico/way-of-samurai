import React from 'react';
import classes from './NewPost.module.scss';
import { useForm } from 'react-hook-form';

export default function NewPost(props) {
	const { handleSubmit, watch, register } = useForm();

	console.log(watch);

	const onSubmit = () => props.addPost(watch('post-text'));

	return (
		<form className={classes.NewPost} onSubmit={ handleSubmit( onSubmit ) }>
			<textarea 
				placeholder='text...'
				{...register('post-text', {minLength: 1})}
			></textarea>
			<button>Add Post</button>
		</form>
	)
}
