import * as React from 'react'
import classes from '../ProfileBody.module.scss';

type PropsType = {
	status: string | null,
	isEdit: boolean,
	isMyProfile?: boolean,
	updateMyStatus: (status: string | null) => void,
}

const ProfileStatus: React.FC<PropsType> = (props) => {

	const [statusText, setStatusText] = React.useState<string | null>(props.status);
	const [isEdit, setIsEdit] = React.useState<boolean>(props.isEdit);

	//if props.status changed
	React.useEffect(() => {
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

	const changeStatusText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const target = event.target as HTMLTextAreaElement;
		const newValue = target.value;
		setStatusText(newValue);
	}

	return (
		<div className={classes.profileStatus}>
			{!isEdit 
			? <p className={classes.statusText} data-testid="status-text" onClick={() => props.isMyProfile && startEdit}>
					{statusText || <i className={classes.defaultStatus}>no info</i>}
				</p>
			: <textarea data-testid="status-textarea" className={classes.statusInput} autoFocus maxLength={Number('300')} value={String(statusText)}
					onChange={ changeStatusText } onBlur={() => props.isMyProfile && finishEdit}
				></textarea>
			}
		</div>
		
	)
}


export default ProfileStatus;