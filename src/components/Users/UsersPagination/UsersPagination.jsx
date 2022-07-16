import React from 'react';
import classes from '../Users.module.scss';

const UsersPagination = (props) => {
	const buttons = props.pagesNumbers.map(num => {
		return (
			<button 
				className={props.currentPage === num ? `${classes.paginationBtn} ${classes._active}` : classes.paginationBtn} 
				key={num}
				onClick={() => props.setCurrentPage(num) }
			>
				{num}
			</button>
		)
	});

	return (
		<div className={classes.UsersPagination}>
			{ buttons }
		</div>
	)
}

export default UsersPagination;