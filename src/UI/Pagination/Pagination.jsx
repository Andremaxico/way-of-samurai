import React, { useState } from 'react';
import classes from './Pagination.module.scss';

const Pagination = ({pagesNumbers, currentPage,changePage, portionSize=10 ,}) => {
	const portionsCount = Math.ceil(pagesNumbers.length / portionSize);
	const	currPortionNum = Math.ceil(currentPage / portionSize);
	const [portionNum, setPortionNum] = useState(currPortionNum);

	const portionLeftBorder = (portionNum - 1) * portionSize;
	const portionRightBorder = portionNum * portionSize + 1;

	const setNextPortion = () => setPortionNum(portionNum + 1);
	const setPrevPortion = () => setPortionNum(portionNum - 1);

	const handlePaginationBtnClick = (num) => {
		changePage(num);

		if(num - portionRightBorder < 2) {
			setNextPortion();
		} else if(num - portionLeftBorder < 2) {
			setPrevPortion();
		}
	}

	const currentNumbers = pagesNumbers.filter(
		num => portionLeftBorder <= num && num <= portionRightBorder 
	);

	const numbers = currentNumbers.map(num => {
		return (
			<button 
				onClick={() => handlePaginationBtnClick(num)} 
				key={num} 
				className={currentPage === num ? `${classes.paginationBtn} ${classes._active}` : classes.paginationBtn}
			>
				{num}
			</button>
		)
	});

	return (
		<div className={classes.Pagination}>
			{portionNum > 1 &&
				<button className={classes.navBtn} onClick={setPrevPortion}>Prev</button>
			}
			{ numbers }
			{portionNum < portionsCount &&
				<button className={classes.navBtn} onClick={setNextPortion}>Next</button>
			}
		</div>
	)
}

export default Pagination;
