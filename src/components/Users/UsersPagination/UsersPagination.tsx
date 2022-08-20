import * as ReactAll from 'react';
import classes from '../Users.module.scss';

const { useEffect, useState, ...React } = ReactAll;

type PropsType = {
	pagesNumbers: Array<number>,
	currentPage: number,
	portionSize?: number,
	setCurrentPage: (num: number) => void;
}

const UsersPagination: React.FC<PropsType> = ({ pagesNumbers, setCurrentPage, currentPage, portionSize = 10 }) => {
	const portionsCount = Math.ceil(pagesNumbers.length / portionSize);
	const portionNumber = Math.ceil(currentPage / portionSize);
	const [portionNum, setPortionNum] = useState(portionNumber);

	const portionLeftBorder = (portionNum - 1) * portionSize;
	const portionRightBorder = portionNum * portionSize + 1;

	
	const setNextPortion = () => setPortionNum(portionNum + 1);
	const setPrevPortion = () => setPortionNum(portionNum - 1);

	const currentNumbers = pagesNumbers.filter((num: number) => portionLeftBorder <= num && num <= portionRightBorder );

	const buttons = currentNumbers.map((num: number) => {
		return (
			<button 
				className={currentPage === num ? `${classes.paginationBtn} ${classes._active}` : classes.paginationBtn} 
				key={num}
				onClick={() => setCurrentPage(num)}
			>
				{num}
			</button>
		)
	});

	return (
		<div className={classes.UsersPagination}>
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