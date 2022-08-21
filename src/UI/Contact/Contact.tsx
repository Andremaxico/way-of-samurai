import * as React from 'react';
import classes from './Contact.module.scss';

type ContactPropsType = {
	title: string,
	value: string | null
}

const Contact: React.FC<ContactPropsType> = ({title, value}) => {
	return (
		<div className={classes.Contact}>
			<a href={value || ''} target='_blank'>{title}</a>
		</div>
	)
}

export default Contact;