import * as React from 'react'
import { DeepRequired, FieldError, FieldErrorsImpl, FieldNamesMarkedBoolean, Merge } from 'react-hook-form';
import classes from './Checkbox.module.scss';

type PropsType<FieldsNames> = {
	register: any,
	name: FieldsNames,
	validation?: object,
	className?:string | undefined,
	error: FieldError | undefined,
	labelText: string | null
}

const Checkbox = <FieldsNames extends string>({
	register, name, validation, className, error, labelText
}: PropsType<FieldsNames>) => {
	return (
		<div className={`${classes.Checkbox} ${className}`}>
			<input 
				type="checkbox" id={name} 
				{...register(name, {required: true, ...validation} )} 
				className={classes.checkboxInput}
			/>
			<label 
				htmlFor={name} tabIndex={Number('0')} 
				className={`${classes.checkboxLabel} ${error && classes.error}`}
			>{labelText}</label>
		</div>
	)
}

export default Checkbox;
