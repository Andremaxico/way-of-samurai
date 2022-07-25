import React from 'react';
import classes from './Textarea.module.scss';

const Textarea = ({register, name, validation, ...rest}) => {
	return (
		<div className={classes.Textarea}>
			<textarea {...register(name, validation)} {...rest}
				className={`${classes.textarea} ${rest.className} ${rest.error && classes.error}`}
			></textarea>
			{rest.error && <p className={classes.errorMessage}>{rest.error.message}</p>}
		</div>
	)
}

export default Textarea;
