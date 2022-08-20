import * as React from 'react'
import { FriendCardType } from '../../../types/types';
import { FriendLink } from './FriendLink/FriendLink';
import classes from './FriendsList.module.scss';

type PropsType = {
	friendsData: Array<FriendCardType>,
}

export const FriendsList: React.FC<PropsType> = ({friendsData}) => {
	return (
		<div className={classes.friends}>
			<h2 className={classes.title}>Friends</h2>
			<div className={classes.grid}>
				{/* Render friends about data */}
				{
					friendsData.map(data => {
						return <FriendLink friendInfo={data} key={data.id}/>
					})
				}
			</div>
		</div>
	)
}
