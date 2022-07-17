import React from 'react';
import classes from './Pagination.module.scss';

const Pagination = (props) => {
	const numbers = props.pagesNumbers.map(num => {
		return <button key={num} className={classes.paginationBtn}>{num}</button>
	});
	return (
		<div className={classes.Pagination}>
			{ numbers }
		</div>
	)
}

export default Pagination;
