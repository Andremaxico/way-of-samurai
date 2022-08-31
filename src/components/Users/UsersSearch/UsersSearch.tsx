import * as React from 'react'
import { useForm } from 'react-hook-form'
import { RootStateType } from '../../../Redux/redux-store';
import { isFollowedType, GetUsersParamsType, isFriendType } from '../../../types/types';
import CustomField from '../../../UI/FormControls/Field/Field'
import classes from './UsersSearch.module.scss';
import { getUsers } from '../../../Redux/users-reducer';
import { connect } from 'react-redux';
import Checkbox from '../../../UI/FormControls/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik';

type CallbacksType = {
	getUsers: (params: GetUsersParamsType) => void,
}
type PropsType = {
	usersRequestData: GetUsersParamsType,
}
type SearchUsersFormType = {
	username: string | '';
	friend: isFriendType | '';
};
type Errors = {
	username?: string;
	friend?: string;
}

const UsersSearch: React.FC<PropsType & CallbacksType> = React.memo(({getUsers, usersRequestData}) => {
	/*const { handleSubmit, register, formState: { errors } } = useForm<SearchUsersFormType>({
		defaultValues: {
			username: usersRequestData.term,
			isFriend: usersRequestData.friend,
		}
	});*/

	const submit = async (
		values: SearchUsersFormType, { setSubmitting }: 
		{setSubmitting: (isSubmitting: boolean) => void}
	) => {
		console.log('submit, values:' , values);
		setSubmitting(true);
		const getUsersParams: GetUsersParamsType = {
			...usersRequestData,
			term: values.username,
			friend: values.friend === '' ? null : values.friend,
			pageNum: 1,
		}
		await getUsers(getUsersParams);
		setSubmitting(false);
	}

	const validate = (values: SearchUsersFormType) => {
		const errors: Errors = {};
		const username: string = values.username;
		if(username.length < 3) {
			errors.username = 'Name is too short';
		}
		return errors;
	}

	const initialValues: SearchUsersFormType = { username: usersRequestData.term, friend: usersRequestData.friend };
	return (
		<Formik
       initialValues={initialValues}
       validate={validate}
       onSubmit={submit}
     >
       {({ isSubmitting, errors, touched }) => (
         <Form className={classes.UsersSearch}>
           <Field type="text" name="username" placeholder={`User's name`}  className={classes.input}/>
			  {touched.username && errors.username && <div>Error message: {errors.username}</div>}
			  <Field as="select" name="friend">
             <option value="">All users</option>
             <option value="true">Only friends</option>
             <option value="false">Only unknown</option>
           </Field>
           <button type="submit" className={classes.searchBtn} disabled={isSubmitting}>
					Search
           </button>
         </Form>
       )}
     </Formik>
	)

	/*return (
		<form className={classes.UsersSearch} onSubmit={handleSubmit(submit)}>
			<CustomField error={errors.username} className={classes.input}>
				<input 
					type="text" autoFocus={true} placeholder='Username...'
					{...register('username', {minLength: {
						value: 3,
						message: 'User name too short'
					}})}
				/>
			</CustomField>
			<Checkbox<keyof SearchUsersFormType> 
				register={register} name='isFriend' error={errors.isFriend} 
				labelText={'Is friend'} className={classes.isFriend}
			/>
			<button className={classes.searchBtn}>Search</button>
		</form>
	)*/
});

const mapStateToProps = (state: RootStateType): PropsType => ({	
	usersRequestData: state.usersPage.requestData,
});

const mapDispatchToProps = {
	getUsers,
}


export default connect<PropsType, CallbacksType>(mapStateToProps, mapDispatchToProps)(UsersSearch);