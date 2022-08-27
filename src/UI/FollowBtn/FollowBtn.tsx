import * as React from 'react';
import { connect } from 'react-redux';
import { RootStateType } from '../../Redux/redux-store';
import { follow, unfollow } from '../../Redux/users-reducer';
import classes from './FollowBtn.module.scss';

type OwnPropsType = {
	isFollowed: boolean,
	userId: number,
};
type PropsType = {
	followingInProgress: Array<number>,
}
type CallbacksType = {
	unfollow: (id: number) => void,
	follow: (id: number) => void
}

const FollowBtn: React.FC<OwnPropsType & PropsType & CallbacksType> = ({
	isFollowed, followingInProgress, userId, ...restProps
}) => {
	const follow = () => restProps.follow(userId);
	const unfollow = () => restProps.unfollow(userId);

	const isFollowingInProgress: boolean = followingInProgress.includes(userId);

	return (
		<button 
			className={classes.followBtn} 
			onClick={!isFollowingInProgress ? (isFollowed ? unfollow : follow) : undefined }
		>{isFollowingInProgress ? 'Processing...' :  isFollowed ? 'Unfollow' : 'Follow'}</button>
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