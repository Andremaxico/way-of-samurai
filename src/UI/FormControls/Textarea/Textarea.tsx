import * as React from 'react';
// import { DeepRequired, FieldErrors, FieldErrorsImpl, Merge } from 'react-hook-form';
import { FormFieldErrorType } from '../../../types/types';
import classes from './Textarea.module.scss';

type PropsType<FormFieldNames> = {
	register: any,
	name: FormFieldNames,
	validation?: object,
	error: FormFieldErrorType | undefined /*| Merge<FieldErrors, FieldErrorsImpl<DeepRequired<any>>> */,
	className?: string,
	placeholder?: string,
	rest?: object,
}

const Textarea = <FieldsNamesType extends string>({
	register, name, validation, error, className, placeholder, ...rest
}: PropsType<FieldsNamesType>): JSX.Element => {
	return (
		<div className={classes.Textarea}>
			<textarea {...register(name, {...validation, 
				minLength: {value: 2, message: 'Your text is too short'}})} {...rest}
				className={`${classes.textarea} ${className} ${error && classes.error}`}
				placeholder={placeholder || ''}
			></textarea>
			{error && <p className={classes.errorMessage}>{error.message}</p>}
		</div>
	)
}

export default Textarea;
