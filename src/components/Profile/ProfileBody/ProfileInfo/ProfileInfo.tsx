import * as React from 'react';
import ProfileStatus from '../ProfileStatus';
import classes from '../ProfileBody.module.scss';
import { ProfileInfoType } from '../../../../types/types';
import Contact from '../../../../UI/Contact/Contact';

type PropsType = {
	profileInfo: ProfileInfoType,
	updateMyStatus: (status: string) => void,
	activateEdit: () => void,
}

const ProfileInfo: React.FC<PropsType> = ({profileInfo, updateMyStatus, activateEdit}) => {
	const {
		fullName, aboutMe, isMyProfile, contacts, 
		lookingForAJob, lookingForAJobDescription,
	} = profileInfo;

	//sets {key: value} to [[key, value]]
	const contactsArr: Array<Array<string>> = Object.entries(contacts || {});
	//map [[key, value]] to React component
	const contactsList = contactsArr.map(([title, value]) => {
		return <Contact key={title} title={title} value={value}/>
	})

	//AndreMaxico => Andre Maxico
	const name: string = fullName.split('').map(symbol => {
		return symbol.toUpperCase() === symbol ? ` ${symbol}` : symbol
	}).join(' ');
	return (
		<div className={classes.ProfileInfo}>
			<p className={classes.login}>{name}</p>
			<div className={classes.statusText}>
				<p>{aboutMe}</p>
			</div>
			<p className={classes.lookingForAJob}><b>Looking for a job:</b> {lookingForAJob ? 'Yes' : 'No'}</p>
			{lookingForAJob &&
				<p className={classes.lookingForAJobDescription}><b>Description:</b> {lookingForAJobDescription}</p>
			}
			<h2 className={classes.contactsTitle}>Contacts</h2>
			<div className={classes.contacts}>
				{contactsList}
			</div>
			{isMyProfile &&
				<button className={classes.editBtn} onClick={activateEdit}>Edit</button>
			}
		</div>
	)
}

export default ProfileInfo;
