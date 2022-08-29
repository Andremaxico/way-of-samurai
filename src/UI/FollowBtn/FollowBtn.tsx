import * as React from 'react';
import { connect } from 'react-redux';
import { RootStateType } from '../../Redux/redux-store';
import { follow, unfollow } from '../../Redux/users-reducer';
import classes from './FollowBtn.module.scss';

type OwnPropsType = {
	isFollowed: 'true' | 'false' | boolean,
	userId: number,
	setIsFollowed?: (value: boolean) => void
};
type PropsType = {
	followingInProgress: Array<number>,
}
type CallbacksType = {
	unfollow: (id: number) => void,
	follow: (id: number) => void
}

const FollowBtn: React.FC<OwnPropsType & PropsType & CallbacksType> = ({
	isFollowed, followingInProgress, userId, setIsFollowed, ...restProps
}) => {
	let isFollowing = isFollowed;
	if(typeof isFollowed !== 'boolean') {
		isFollowing = (isFollowed === 'true') ? true : false;
	}
	const follow = async () => {
		await restProps.follow(userId);
		if(setIsFollowed) {
			setIsFollowed(true);
		}
	};
	const unfollow = async () => {
		await restProps.unfollow(userId);
		if(setIsFollowed) {
			setIsFollowed(false);
		}
	};
	console.log('follow btn is followed: ', isFollowing);
	const handleButtonClick = () => {
		return !isFollowingInProgress ? (Boolean(isFollowing) ? unfollow() : follow()) : undefined
	}

	const isFollowingInProgress: boolean = followingInProgress.includes(userId); 
	return (
		<button 
			className={classes.followBtn} 
			onClick={handleButtonClick}
		>{isFollowingInProgress ? 'Processing...' :  Boolean(isFollowing) ? 'Unfollow' : 'Follow'}</button>
	)
}

const mapDispatchToProps: CallbacksType = {
	follow,
	unfollow,
}
const mapStateToProps = (state: RootStateType): PropsType => {
	return {
		followingInProgress: state.usersPage.followingInProgress,
	}
}

export default connect<PropsType, CallbacksType>(mapStateToProps, mapDispatchToProps)(FollowBtn);