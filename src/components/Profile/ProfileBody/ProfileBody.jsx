import React from 'react'
import ProfileInfo from '../../../UI/ProfileInfo';
import classes from '../Profile.module.scss';
import defaultCover from '../../../assets/images/default-user-cover.jpg';

const ProfileBody = (props) => {
	const coverImg =  props.profileData?.photos?.large; 
	return (
		<div className={classes.ProfileBody}>
			<div className={classes.cover}>
				<img src={coverImg || defaultCover} alt="cover img"/>
			</div>
			<ProfileInfo info={props.profileData}/>
		</div>
	)
}

export default ProfileBody;