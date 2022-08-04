import React, { useState, useEffect } from 'react'; 
import classes from '../ProfileInfo.module.scss';

const ProfileStatus = ({ status, setMyStatus, isMyProfile }) => {
	const [isEdit, setIsEdit] = useState(false)
	const [statusText, setStatusText] = useState(status || '');

	useEffect(() => {
		setStatusText(status);
	}, [status]);

	const activateEditMode = () => setIsEdit(true);
	const deactivateEditMode = () => {
		setIsEdit(false);
		setMyStatus(statusText);
	};

	const changeStatus = (event) => {
		const text = event.target.value;
		setStatusText(text);
	};

	return (
		<div className={classes.ProfileStatus}>
			{!isEdit ?
				<p className={classes.text} data-testid='status-text' 
					onClick={isMyProfile ? activateEditMode : undefined}
				>{statusText || <i>no info</i>}</p>
			: 
				<textarea 
					data-testid='status-input' onChange={changeStatus} 
					onBlur={isMyProfile ? deactivateEditMode : undefined}
					className={classes.textarea} value={statusText} autoFocus
				></textarea>
			}
		</div>
	)
}

export default ProfileStatus;
