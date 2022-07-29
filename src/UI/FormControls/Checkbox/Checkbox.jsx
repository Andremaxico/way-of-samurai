import React from 'react'
import classes from './Checkbox.module.scss';

const Checkbox = ({register, name, ...rest}) => {
	return (
		<div className={`${classes.Checkbox} ${rest.className}`}>
			<input 
				type="checkbox" id={name} 
				{...register(name, rest.validation)} 
				className={classes.checkboxInput}
			/>
			<label htmlFor={name} tabIndex='0' className={`${classes.checkboxLabel} ${rest.error && classes.error}`}>{rest.labelText}</label>
		</div>
	)
}

export default Checkbox;
