import * as React from 'react';
import classes from './ScrollToBottomBtn.module.scss';
import {scrollElementToBottom} from '../../../../utils/helpers/events';
import arrowImg from '../../../../assests/images/arrow.png'

type PropsType = {
	element: HTMLDivElement | null,
};

const ScrollToBottomBtn: React.FC<PropsType> = ({element}) => {
	const handleClick = () => {
		scrollElementToBottom(element);
	}

	return (
		<button className={classes.scrollBtn} onClick={handleClick}>
			<img className={classes.arrow} src={arrowImg} alt='scrollBottom' />
		</button>
	)
}

export default ScrollToBottomBtn  