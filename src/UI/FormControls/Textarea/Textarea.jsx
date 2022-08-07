import React from 'react';
import classes from './Textarea.module.scss';

const Textarea = ({register, name, validation, ...rest}) => {
	return (
		<div className={classes.Textarea}>
			<textarea {...register(name, {...validation, 
				minLength: {value: 2, message: 'Your text is too short'}})} {...rest}
				className={`${classes.textarea} ${rest.className} ${rest.error && classes.error}`}
				placeholder={rest.placeholder || ''}
			></textarea>
			{rest.error && <p className={classes.errorMessage}>{rest.error.message}</p>}
		</div>
	)
}

export default Textarea;
