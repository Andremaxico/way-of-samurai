import React from 'react';
import classes from './Checkbox.module.scss';

const Checkbox = ({name, validation, register, error,...rest}) => {
	return (
		<div className={`${classes.Checkbox} ${rest.className}`}>
			<input 
				type="checkbox" {...register(name, {...validation})} 
				id={name} name={name} className={`${error && classes.error}`}
			/>
			<label htmlFor={name}>{rest.labelText}</label>
		</div>
	)
}

export default Checkbox;
