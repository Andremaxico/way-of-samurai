import React from 'react';
import classes from './Field.module.scss';

const Field = ({error, children, ...rest}) => {
	return (
		<div className={`${classes.Field} ${rest.className}`}>
			{children}
			{error &&
				<div className={classes.error}>
					<p className={classes.errorMessage}>{error.message}</p>
				</div>
			}
		</div>
	)
}


export const EmailField = ({validation, name ,register, error, ...rest}) => {
	return (
		<Field error={error} className={rest.className}>
			<input 
				type='email' {...register(name, {...validation, required: true})}
				placeholder='Type your email' className={classes.input}
			/>
		</Field>
	)
}

export const PasswordField = ({validation, name, register, error, ...rest}) => {
	return (
		<Field error={error} className={rest.className}>
			<input 
				type='password' {...register(name, {...validation, 
					required: true,
					minLength: {value: 8, message: 'Your password is too short'},
					maxLength: {value: 20, message: 'Your password is too long'},
				})} autoComplete='true'
				placeholder='Type your password' className={classes.input}
			/>
		</Field>
	)
}

export  default Field;
