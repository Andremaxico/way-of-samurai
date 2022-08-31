import * as ReactAll from 'react';
import classes from './Pagination.module.scss';

const { useEffect, useState, ...React } = ReactAll;

type PropsType = {
	pagesNumbers: Array<number>,
	currentPage: number,
	portionSize?: number,
	whiteTheme?: boolean,
	setCurrentPage: (num: number) => void,
}

const UsersPagination: React.FC<PropsType> = (
	{ pagesNumbers, setCurrentPage, currentPage,  whiteTheme, portionSize = 10 }
) => {
	const portionsCount: number = Math.ceil(pagesNumbers.length / portionSize);
	const portionNumber: number = Math.ceil(currentPage / portionSize);
	const [portionNum, setPortionNum] = useState(portionNumber);

	const portionLeftBorder = (portionNum - 1) * portionSize;
	const portionRightBorder = portionNum * portionSize + 1;

	
	const setNextPortion = () => setPortionNum(portionNum + 1);
	const setPrevPortion = () => setPortionNum(portionNum - 1);

	const currentNumbers = pagesNumbers.filter((num: number) => portionLeftBorder <= num && num <= portionRightBorder );

	const buttons = currentNumbers.map((num: number) => {
		return (
			<button 
				className={ `${currentPage === num ? 
					`${classes.paginationBtn} ${classes._active}` 
					: classes.paginationBtn} ${whiteTheme && classes._white}`} 
				key={num}
				onClick={() => setCurrentPage(num)}
			>
				{num}
			</button>
		)
	});

	return (
		<div className={classes.Pagination}>
			{portionNum > 1 && 
				<button className={classes.navBtn} onClick={ setPrevPortion }>Prev</button>
			}

			{ buttons }

			{portionNum < portionsCount &&
				<button className={classes.navBtn} onClick={ setNextPortion }>Next</button>
			}
		</div>
	)
}

export default UsersPagination;