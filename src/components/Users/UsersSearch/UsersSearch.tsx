import * as React from 'react'
import { useForm } from 'react-hook-form'
import { RootStateType } from '../../../Redux/redux-store';
import { GetUsersParamsType } from '../../../types/types';
import Field from '../../../UI/FormControls/Field/Field'
import classes from './UsersSearch.module.scss';
import { getUsers } from '../../../Redux/users-reducer';
import { connect } from 'react-redux';
import Checkbox from '../../../UI/FormControls/Checkbox';

type CallbacksType = {
	getUsers: (params: GetUsersParamsType) => void,
}
type PropsType = {
	usersRequestData: GetUsersParamsType,
}
type SearchUsersFormType = {
	username: string | null,
	isFriend: boolean,
}

const UsersSearch: React.FC<PropsType & CallbacksType> = ({getUsers, usersRequestData}) => {
	const { handleSubmit, register, formState: { errors } } = useForm<SearchUsersFormType>({
		defaultValues: {
			username: usersRequestData.term,
			isFriend: usersRequestData.friend,
		}
	});

	const onSubmit = (data: SearchUsersFormType) => {
		const getUsersParams: GetUsersParamsType = {
			...usersRequestData,
			term: data.username,
			friend: data.isFriend,
		}
		getUsers(getUsersParams);
	}

	return (
		<form className={classes.UsersSearch} onSubmit={handleSubmit(onSubmit)}>
			<Field error={errors.username} className={classes.input}>
				<input 
					type="text" autoFocus={true} placeholder='Username...'
					{...register('username', {minLength: {
						value: 3,
						message: 'User name too short'
					}})}
				/>
			</Field>
			<Checkbox<keyof SearchUsersFormType> 
				register={register} name='isFriend' error={errors.isFriend} 
				labelText={'Is friend'} className={classes.isFriend}
			/>
			<button className={classes.searchBtn}>Search</button>
		</form>
	)
}

const mapStateToProps = (state: RootStateType): PropsType => ({	
	usersRequestData: state.usersPage.requestData,
});

const mapDispatchToProps = {
	getUsers,
}


export default connect<PropsType, CallbacksType>(mapStateToProps, mapDispatchToProps)(UsersSearch);