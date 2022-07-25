import React from 'react';
import classes from './Field.module.scss';

const Field = ({className, ...rest }) => {
	return (
		<div className={`${classes.Field} ${className}`}>
			{rest.children}
			{rest.error && <p className={classes.errorMessage}>{rest.error.message}</p>}
		</div>
	)
}

export const PasswordField = ({register, ...rest}) => {
	return (
		<Field {...rest}>
			<input 
				type="password" className={classes.input} 
				placeholder='Password' {...register('password', {
					required: 'This field is required',
					pattern: {
						//value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
						message: 'Password must have at least 1 upper case symbol, 1 number', 
					},
					minLength: {value: 8, message: 'Your password too short'},
					maxLength: {value: 14, message: 'Your password too long'},
				})}
			/>
		</Field>
	)
}

export default Field;
