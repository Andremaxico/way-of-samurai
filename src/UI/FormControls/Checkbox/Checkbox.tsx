import * as React from 'react'
import classes from './Checkbox.module.scss';

type PropsType = {
	register: any,
	name: string,
	validation?: object,
	className?:string | undefined,
	error: string | undefined | null,
	labelText: string | null
}

const Checkbox: React.FC<PropsType> = ({register, name, validation, className, error, labelText}) => {
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
