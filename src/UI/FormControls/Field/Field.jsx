import React from 'react';
import classes from './Field.module.scss';

const Field = ({className, error, children }) => {
	return (
		<div className={`${classes.Field} ${className}`}>
			{children}
			{error && <p className={classes.errorMessage}>{error.message}</p>}
		</div>
	)
}

export const PasswordField = ({register, ...rest}) => {
	return (
		<Field {...rest}>
			<input 
				type="password" className={classes.input}  autoComplete='true'
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

export const EmailField = ({register, ...rest}) => {
	return (
		<Field {...rest}>
			<input 
				type="email" className={classes.input} 
				placeholder='Email' {...register('email', {
					required: 'This field is required',
				})}
			/>
		</Field>
	)
}

export default Field;
