import * as React from 'react';
import { FormFieldErrorType } from '../../../types/types';
import Field, { FieldPropsType } from './Field';
import classes from './Field.module.scss';

const EmailField: React.FC<FieldPropsType> = ({register, error, className, ...rest}) => {
	return (
		<Field error={error} {...rest}>
			<input 
				type="email" className={classes.input} 
				placeholder='Email' {...register('email', {
					required: 'This field is required',
				})}
			/>
		</Field>
	)
}

export default EmailField;