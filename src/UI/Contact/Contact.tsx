import * as React from 'react';
import classes from '../ProfileBody.module.scss';

type ContactPropsType = {
	title: string,
	value: string | null
}

const Contact: React.FC<ContactPropsType> = ({title, value}) => {
	return (
		<div className={classes.contact}>
			<a href={value || ''} target='_blank'>{title}</a>
		</div>
	)
}

export default Contact;