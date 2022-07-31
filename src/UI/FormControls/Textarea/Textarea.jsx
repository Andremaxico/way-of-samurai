import React from 'react';
import classes from './Textarea.module.scss';

const Textarea = ({register, name, validation, ...rest}) => {
	return (
		<div className={classes.Textarea}>
			<textarea {...register(name, {...validation, 
				minLength: {value: 2, message: 'Your message must have more than 1 symbol'}})} {...rest}
				className={`${classes.textarea} ${rest.className} ${rest.error && classes.error}`}
			></textarea>
			{rest.error && <p className={classes.errorMessage}>{rest.error.message}</p>}
		</div>
	)
}

export default Textarea;
