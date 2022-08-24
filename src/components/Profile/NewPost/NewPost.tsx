import * as React from 'react';
import classes from './NewPost.module.scss';
import { useForm } from 'react-hook-form';
import Textarea from '../../../UI/FormControls/Textarea';

type PropsType = {
	addPost: (value: string) => void,
}

type NewPostFieldValuesType = {
	postText: string
}

const NewPost: React.FC<PropsType> = ({addPost}) => {
	const { handleSubmit, resetField, watch, register, formState: { errors } } = useForm<NewPostFieldValuesType>();

	const onSubmit = () => {
		addPost(watch('postText'));
		resetField('postText')
	};

	return (
		<form className={classes.NewPost} onSubmit={ handleSubmit( onSubmit ) }>
			<Textarea<keyof NewPostFieldValuesType>
				validation={{maxLength: {value: 500, message: 'Your post too long'},
								}}
				name='postText' placeholder='text...' register={register} error={errors.postText}
			/>
			<button>Add Post</button>
		</form>
	)
}

export default NewPost;
