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
	currentPage: number,
	pagesSize: number,
}
type SearchUsersFormType = {
	username: string,
	isFriend: boolean,
}

const UsersSearch: React.FC<PropsType & CallbacksType> = ({getUsers, currentPage, pagesSize}) => {
	const { handleSubmit, register, formState: { errors } } = useForm<SearchUsersFormType>();

	const onSubmit = (data: SearchUsersFormType) => {
		const getUsersParams: GetUsersParamsType = {
			pageNum: currentPage,
			pagesSize,
			term: data.username,
			friend: data.isFriend,
		}
		getUsers(getUsersParams);
	}
	console.log(errors);
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

const mapStateToProps = (state: RootStateType) => ({	
	currentPage: state.usersPage.currentPage,
	pagesSize: state.usersPage.pagesSize,
});

const mapDispatchToProps = {
	getUsers,
}


export default connect<PropsType, CallbacksType>(mapStateToProps, mapDispatchToProps)(UsersSearch);