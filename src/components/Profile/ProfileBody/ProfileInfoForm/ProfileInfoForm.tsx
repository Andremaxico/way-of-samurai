import * as React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Field from '../../../../UI/FormControls/Field/Field';
import Checkbox from '../../../../UI/FormControls/Checkbox';
import Textarea from '../../../../UI/FormControls/Textarea';
import classes from '../ProfileBody.module.scss';
import { ContactsType, ProfileInfoType, ReactHookFormType } from '../../../../types/types';

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
		setFocus, formState: { errors }
	} = useForm<ProfileInfoType>({
		defaultValues: {
			...profileInfo
		}
	});
	const [summaryError, setSummaryError] = React.useState<string | null>(null)
	
	React.useEffect(() => {
		setFocus("fullName", {shouldSelect: true});
	}, [setFocus]);

	//sets {key: value} -> [[key, value]]
	const contactsArr: Array<Array<string>> = Object.entries(profileInfo.contacts);
	//map [[key, value]] -> React component
	const contactsInputsList = contactsArr.map(([title, value]: Array<string>) => {
		const name: any =`contacts.${title}`;
		return (
			<div className={classes.contact} key={title}>
				<b>{title}:</b>
				<Field className={classes.contact} error={errors.contacts && errors.contacts[title as keyof ContactsType]}>
					<input key={title}
						type="url" placeholder={`Input your ${title}'s link`} {...register(name, {
							pattern: {
								value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
								message: 'Input valid link, https://www.websiteName.com/...',
							},
						})}
					/>
				</Field>
			</div>
		)
	})

	React.useEffect(() => {
		setSummaryError(formError);
	}, [formError])

	const onSubmit: SubmitHandler<ProfileInfoType> = (data) => {
		if(!summaryError) {
			updateMyProfileData(data);
			deactivateEdit();
		}
	}

	const onFormChange = () => setSummaryError(null);

	return (
		<form className={classes.ProfileInfoForm} onChange={onFormChange} onSubmit={handleSubmit(onSubmit)}>
			{summaryError &&
				<p className={classes.errorMessage}>{summaryError}</p>
			}
			<Field className={classes.input} error={errors.fullName}>
				<input type="text" placeholder='Input your login' {...register('fullName', {
					pattern: /[a-zA-Z]+/,
					minLength: {value: 2, message: 'Your name must include over 1 symbol'},
					maxLength: {value: 60, message: 'Your login must be shorter than 61 symbol'},
				})}/>
			</Field>
			<Textarea<keyof ProfileInfoType>
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