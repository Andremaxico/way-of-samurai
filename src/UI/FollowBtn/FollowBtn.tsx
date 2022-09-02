import * as React from 'react';
import { connect } from 'react-redux';
import { RootStateType } from '../../Redux/redux-store';
import { follow, unfollow } from '../../Redux/users-reducer';
import { isFollowedType } from '../../types/types';
import classes from './FollowBtn.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectFollowingInProgress } from '../../Redux/users-selectors';
import { AnyAction, Dispatch } from 'redux';


type OwnPropsType = {
	isFollowed: isFollowedType,
	userId: number,
	setIsFollowed?: (value: boolean) => void
};

const FollowBtn: React.FC<OwnPropsType> = React.memo(({
	isFollowed, userId, setIsFollowed, ...restProps
}) => {
	const followingInProgress = useSelector(selectFollowingInProgress);
	
	const dispatch = useDispatch();
	const followUser = async () => {
		dispatch(follow(userId) as unknown as AnyAction);
		if(setIsFollowed) {
			setIsFollowed(true);
		}
	};
	const unfollowUser = async () => {
		await dispatch(unfollow(userId) as unknown as AnyAction);
		if(setIsFollowed) {
			setIsFollowed(false);
		}
	}

	let isFollowing = isFollowed;
	if(typeof isFollowed !== 'boolean') {
		isFollowing = (isFollowed === 'true') ? true : false;
	}

	const handleButtonClick = () => {
		return !isFollowingInProgress ? (isFollowing ? unfollowUser() : followUser()) : undefined
	}

	const isFollowingInProgress: boolean = followingInProgress.includes(userId); 
	return (
		<button 
			className={classes.followBtn} 
			onClick={handleButtonClick}
		>{isFollowingInProgress ? 'Processing...' :  isFollowing ? 'Unfollow' : 'Follow'}</button>
	)
});

export default FollowBtn;