import React, { useState, useEffect } from 'react'
import classes from '../ProfileBody.module.scss';

const  ProfileStatus = (props) => {

	const [statusText, setStatusText] = useState(props.status);
	const [isEdit, setIsEdit] = useState(false);

	//if props.status changed
	useEffect(() => {
		if(props.status !== statusText) {
			setStatusText(props.status);
		}
	}, [props.status])

	const startEdit = () => setIsEdit(true);

	const finishEdit = () => {
		//if we type new status
		if(statusText != props.status) {
			//send put request to server
			props.updateMyStatus(statusText);
		}

		setIsEdit(false);
	}

	const changeStatusText = (event) => {
		const newValue = event.target.value;
		setStatusText(newValue);
	}

	return (
		<div className={classes.profileStatus}>
			{!isEdit 
			? <p className={classes.statusText} onClick={props.isMyProfile && startEdit}>
					{statusText || <i className={classes.defaultStatus}>no info</i>}
				</p>
			: <textarea className={classes.statusInput} autoFocus maxLength='300' value={statusText}
					onChange={ changeStatusText } onBlur={props.isMyProfile && finishEdit}
				></textarea>
			}
		</div>
		
	)
}


export default ProfileStatus;