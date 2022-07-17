import React from 'react';
import classes from './Pagination.module.scss';

const Pagination = (props) => {
	const setCurrentPage = (num) => {
		props.setCurrentPage(num);
	} ;
	const numbers = props.pagesNumbers.map(num => {
		return (
			<button 
				onClick={() => setCurrentPage(num)} 
				key={num} 
				className={props.currentPage === num ? `${classes.paginationBtn} ${classes._active}` : classes.paginationBtn}
			>
				{num}
			</button>
		)
	});
	return (
		<div className={classes.Pagination}>
			{ numbers }
		</div>
	)
}

export default Pagination;
