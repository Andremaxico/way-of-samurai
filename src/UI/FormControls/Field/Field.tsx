import * as React from 'react';
import { FormFieldErrorType } from '../../../types/types';
import classes from './Field.module.scss';

export type FieldPropsType = {
	register?: any,
	error: FormFieldErrorType | undefined,
	className?: string | undefined,
	rest?: object,
} 

type PropsType = {
	children: any,
} & FieldPropsType;

const Field: React.FC<PropsType> = ({className, error, children }) => {
	return (
		<div className={`${classes.Field} ${className}`}>
			{children}
			{error && <p className={classes.errorMessage}>{error.message}</p>}
		</div>
	)
}

export default Field;
