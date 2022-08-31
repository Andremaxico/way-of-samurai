import * as React from 'react'
import ProfileBody from './ProfileBody';
import MyPosts from './MyPosts';
import NewPost from './NewPost'
import classes from './Profile.module.scss'
import Preloader from '../../UI/Preloader';
import { isFollowedType, ProfileInfoType, UserCardType } from '../../types/types';

export type ProfilePropsType = {
	currUserProfileInfo: ProfileInfoType,
	formError: string | null,
	followed: isFollowedType,
	updateMyStatus: (status: string) => void,
	logout: () => void,
	setAvatar: (file: any) => void, 
	updateMyProfileData: (profileData: ProfileInfoType) => void,
}

const Profile: React.FC<ProfilePropsType> = (props) => {
	return (
		<div className={classes.profile}>
			<ProfileBody 
				{...props}
			/>
			<h2 className={classes.title}>My posts</h2>
			<NewPost />
			<MyPosts />
		</div>
	)
}

export default Profile;
