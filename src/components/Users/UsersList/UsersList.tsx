import * as React from 'react';
import User from '../User/User';
import classes from '../Users.module.scss';
import Preloader from '../../../UI/Preloader/Preloader';
import Pagination from '../../../UI/Pagination';
import { selectIsFetching, selectPagesNumbers, selectUsersData, selectUsersRequestData } from '../../../Redux/users-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, usersActions } from '../../../Redux/users-reducer';
import { GetUsersParamsType } from '../../../types/types';
import { AnyAction } from 'redux';
import { useLocation } from 'react-router-dom';
import { stringToBoolean } from '../../../utils/helpers/converters';
import { parseQueryString } from '../../../utils/parsers';
type RequestUsersParamsType = {
	pageNum?: string | number,
	term?: string,
	friend?: any,
};
type OwnProps = {}
type PropsType =  OwnProps;

const UsersList: React.FC<PropsType> = (props) => {
	const usersData = useSelector(selectUsersData);
	const usersPagesNumbers = useSelector(selectPagesNumbers);
	const usersRequestData = useSelector(selectUsersRequestData);
	const isFetching = useSelector(selectIsFetching);

	const dispatch = useDispatch();
	const setCurrentPage = (num: number): void => {
		const getUsersParams: GetUsersParamsType = {
			... usersRequestData,
			pageNum: num,
		}
		//dispatch(usersActions.setRequestData(getUsersParams));
		//changes current users-page number
		dispatch(usersActions.setCurrentPageAC(num));
		//request users page
		dispatch(getUsers(getUsersParams) as unknown as AnyAction);
	}
	const requestUsers = (requestData: RequestUsersParamsType) => {
		//get users data from server -> set to state
		const getUsersParams: GetUsersParamsType = {
			...usersRequestData,
			...requestData as GetUsersParamsType,
		}
		dispatch(getUsers(getUsersParams) as unknown as AnyAction );
	}
	const setRequestData = (data: GetUsersParamsType) => {
		dispatch(usersActions.setRequestData(data));
	}

	//start render
	const location = useLocation();
	React.useEffect(() => {
		let requestParams: RequestUsersParamsType = parseQueryString(location.search);

		requestParams.pageNum = Number(requestParams.pageNum);
		requestParams.friend = requestParams.friend !== undefined ? stringToBoolean(requestParams.friend) : null;

		requestUsers(requestParams);
		setRequestData(requestParams as GetUsersParamsType);
	}, []);

	const list = usersData.map(data => {
		return (
			<User 
				info={data} key={data.id} 
			/>
		)
	});

	//when loading
	if(isFetching) {
		return <Preloader />
	}
	return (
		<div className={classes.UsersList}>
			<Pagination 
				pagesNumbers={usersPagesNumbers}
				currentPage={usersRequestData.pageNum}
				setCurrentPage={setCurrentPage}
			/>
			<div className={classes.UsersList}>
				{ list.length > 0 ? list : 
					<div className={classes.noUsersMessage}>
						No users founded
					</div> 
				}
			</div>
		</div>
	)
}

export default UsersList;
