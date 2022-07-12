import React from 'react'
import ProfileInfo from '../../../UI/ProfileInfo';
import classes from '../Profile.module.scss';


const ProfileBody = (props) => {
	console.log(props);
	return (
		<div className={classes.ProfileBody}>
			<div className={classes.cover}>
				<img src={props.profileInfo.coverUrl}/>
			</div>
			<ProfileInfo info={props.profileInfo}/>
		</div>
	)
}

export default ProfileBody;