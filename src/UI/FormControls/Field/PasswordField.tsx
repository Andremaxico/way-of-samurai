import * as React from 'react';
import { FormFieldErrorType } from '../../../types/types';
import Field, { FieldPropsType } from './Field';
import classes from './Field.module.scss';

const PasswordField: React.FC<FieldPropsType> = ({register, error,...rest}) => {
	return (
		<Field error={error} {...rest}>
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

export default PasswordField;