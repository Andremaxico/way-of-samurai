import * as React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Field from '../../../../UI/FormControls/Field/Field';
import Checkbox from '../../../../UI/FormControls/Checkbox';
import Textarea from '../../../../UI/FormControls/Textarea';
import classes from '../ProfileBody.module.scss';
import { ProfileInfoType, ReactHookFormType } from '../../../../types/types';

type PropsType = {
	formError: string | null,
	profileInfo: ProfileInfoType,
	updateMyStatus: (status: string) => void,
	updateMyProfileData: (profileData: ProfileInfoType) => void,
	deactivateEdit: () => void,
}

const ProfileInfoForm: React.FC<PropsType> = ({
	deactivateEdit, profileInfo, updateMyProfileData, formError
}) => {
	const { 
		register, handleSubmit, watch, 
		setFocus, formState: { errors }, setError, clearErrors
	}: ReactHookFormType = useForm<ProfileInfoType>({
		defaultValues: {
			...profileInfo
		}
	});
	
	React.useEffect(() => {
		setFocus("fullName", {shouldSelect: true});
	}, [setFocus]);

	//sets {key: value} to [[key, value]]
	const contactsArr: Array<Array<string>> = Object.entries(profileInfo.contacts);
	//map [[key, value]] to React component
	const contactsInputsList = contactsArr.map(([title, value]) => {
		return (
			<div className={classes.contact} key={title}>
				<b>{title}:</b>
				<Field className={classes.contact} error={errors.contacts && errors.contacts[title]}>
					<input key={title}
						type="url" placeholder={`Input your ${title}'s link`} {...register(`contacts.${title}`, {
							pattern: {
								value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
								message: 'Input valid link, http://www.websiteName.com/...',
							},
						})}
					/>
				</Field>
			</div>
		)
	})

	React.useEffect(() => {
		if(formError) {
			setError('summary', {
				type: 'custom',
				message: formError,
			});
		} else {
			clearErrors('summary');
		}
	}, [formError])

	const onSubmit: SubmitHandler<ProfileInfoType> = (data) => {
		updateMyProfileData(data);
		deactivateEdit();
	}

	const onFormChange = () => {
		clearErrors('summary');
	}

	return (
		<form className={classes.ProfileInfoForm} onChange={onFormChange} onSubmit={handleSubmit(onSubmit)}>
			{errors.summary &&
				<p className={classes.errorMessage}>{errors.summary.message}</p>
			}
			<Field className={classes.input} error={errors.fullName}>
				<input type="text" placeholder='Input your login' {...register('fullName', {
					pattern: /[a-zA-Z]+/,
					minLength: {value: 2, message: 'Your name must include over 1 symbol'},
					maxLength: {value: 60, message: 'Your login must be shorter than 61 symbol'},
				})}/>
			</Field>
			<Textarea 	
				placeholder='About me' name='aboutMe'
				error={errors.aboutMe} validation={{ maxLength: { value: 300, message: 'Max status length: 300' } }}
				register={register} />
			<div className={classes.lookingForAJob}><b>Looking for a job:</b> 
				<Checkbox 
					name='lookingForAJob' register={register} validation={{ required: false }} 
					labelText='' error={errors.lookingForAJob}/>
			</div>
			{watch('lookingForAJob') &&
				<div className={classes.lookingForAJobDescription}><b>Description:</b> 
					<Textarea 
						register={register} name='lookingForAJobDescription'
						error={errors.lookingForAJobDescription} placeholder='For job description' validation={undefined} rest={undefined}					/>
				</div>
			}
			<div className={classes.contacts}>
				<h2 className={classes.contactsTitle}>Contacts</h2>
				{ contactsInputsList }
			</div>
			<button type='submit' className={classes.submitBtn}>Save</button>
		</form>
	)
}

export default ProfileInfoForm;