import * as React from 'react'
import ProfileBody from './ProfileBody';
import MyPosts from './MyPosts';
import NewPost from './NewPost'
import classes from './Profile.module.scss'
import Preloader from '../../UI/Preloader';
import { isFollowedType, ProfileInfoType, UserCardType } from '../../types/types';

export type ProfilePropsType = {
	followed: isFollowedType,
	currUserProfileInfo: ProfileInfoType,
}

const Profile: React.FC<ProfilePropsType> = (props) => {
	return (
		<div className={classes.profile}>
			<ProfileBody {...props}/>
			<h2 className={classes.title}>My posts</h2>
			<NewPost />
			<MyPosts />
		</div>
	)
}

export default Profile;
