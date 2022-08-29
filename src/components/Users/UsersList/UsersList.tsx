import * as React from 'react';
import User from '../User/User';
import classes from '../Users.module.scss';
import Preloader from '../../../UI/Preloader/Preloader';
import Pagination from '../../../UI/Pagination';
import { UsersListPropsType } from './UsersListContainer';

type OwnProps = {
	setCurrentPage: (pageNum: number) => void,
}
type PropsType = UsersListPropsType & OwnProps;

const UsersList: React.FC<PropsType> = (props) => {
	//console.log('update users data: ', props.usersData);
	const list = props.usersData.map(data => {
		return (
			<User 
				info={data} key={data.id} 
			/>
		)
	});

	//when loading
	if(props.isFetching) {
		return <Preloader />
	}
	return (
		<div className={classes.UsersList}>
			<Pagination 
				pagesNumbers={props.usersPagesNumbers}
				currentPage={props.usersRequestData.pageNum}
				setCurrentPage={props.setCurrentPage}
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
