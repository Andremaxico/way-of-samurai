import * as React from 'react'
import { GetUsersParamsType, isFriendType } from '../../../types/types';
import classes from './UsersSearch.module.scss';
import { getUsers } from '../../../Redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { selectUsersRequestData } from '../../../Redux/users-selectors';
import { AnyAction } from 'redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { stringToBoolean } from '../../../utils/helpers/converters';
import { parseQueryString } from '../../../utils/parsers';

type PropsType = {}
type SearchUsersFormType = {
	username: string | '';
	friend: isFriendType | '';
};
type Errors = {
	username?: string;
	friend?: string;
}

const UsersSearch: React.FC<PropsType> = React.memo((props) => {
	const usersRequestData = useSelector(selectUsersRequestData);

	const dispatch = useDispatch();
	const requestUsers =  (requestData: GetUsersParamsType) => {
		dispatch(getUsers(requestData) as unknown as AnyAction);
	}

	const submit = async (
		values: SearchUsersFormType, { setSubmitting }: 
		{setSubmitting: (isSubmitting: boolean) => void}
	) => {
		setSubmitting(true);
		const getUsersParams: GetUsersParamsType = {
			...usersRequestData,
			term: values.username,
			friend: values.friend === '' ? null : values.friend,
			pageNum: 1,
		}
		await requestUsers(getUsersParams);
		setSubmitting(false);
	}

	const validate = (values: SearchUsersFormType) => {
		const errors: Errors = {};
		const username: string = values.username;
		if( username.length > 0 && username.length < 3) {
			errors.username = 'Name is too short';
		}
		return errors;
	}

	//synchronization with address line
	const navigate = useNavigate();

	React.useEffect(() => {
		const {term, friend, pageNum} = usersRequestData;
		const friendQueryParam = friend !== null && friend !== undefined && `&friend=${friend}` || '';
		navigate(`?${`term=${term}`}${friendQueryParam}&pageNum=${pageNum || 1}`);
	}, [usersRequestData]);
	
	const initialValues: SearchUsersFormType = { username: usersRequestData.term, friend: usersRequestData.friend };
	return (
		<Formik
			enableReinitialize={true}
			initialValues={initialValues}
			validate={validate}
			onSubmit={submit}
     >
       {({ isSubmitting, errors, touched }) => (
         <Form className={classes.UsersSearch}>
				<div className={classes.field}>
					<Field type="text" name="username" placeholder={`User's name`}  className={classes.input}/>
					{touched.username && errors.username && <div>Error message: {errors.username}</div>}
				</div>	
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

export default UsersSearch;