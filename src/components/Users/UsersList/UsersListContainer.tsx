import * as React from 'react';
import { connect } from "react-redux"
import withNetworkRedirect from '../../../hocs/withNetworkRedirect';
import { RootStateType } from '../../../Redux/redux-store';
import { follow, unfollow, usersActions, getUsers
} from "../../../Redux/users-reducer";
import { selectPageSize, selectPagesNumbers, selectTotalUsersCount, selectUsersData } from '../../../Redux/users-selectors';
import { GetUsersParamsType, UserCardType } from '../../../types/types';
import UsersList from './UsersList';

type MapStatePropsType = {
	usersRequestData: GetUsersParamsType,
	usersData: Array<UserCardType>,
	usersPagesNumbers: Array<number>,
	totalUsersCount: number,
	isFetching: boolean,
}
type MapDispatchPropsType = {
	setCurrentPage: (pageNum: number) => void,
	getUsers: ({pageNum, ...params}: GetUsersParamsType) => void,
}
export type UsersListPropsType = MapStatePropsType & MapDispatchPropsType;

class UsersListContainer extends React.Component<UsersListPropsType> {
	props: UsersListPropsType;
	componentDidMount() {
		//get users data from server -> set to state
		const getUsersParams: GetUsersParamsType = {
			...this.props.usersRequestData,
		}
		this.props.getUsers(getUsersParams);
	}
	
	setCurrPage = (num: number): void => {
		const getUsersParams: GetUsersParamsType = {
			...this.props.usersRequestData,
			pageNum: num,
		}
		//changes current users-page number
		this.props.setCurrentPage(num);
		//request users page
		this.props.getUsers(getUsersParams);

	}

	render() {
		return (
			<UsersList {...this.props} setCurrentPage={this.setCurrPage}/>
		)
	}
}


const mapStateToProps = (state: RootStateType): MapStatePropsType => {
	return {
		usersData: state.usersPage.usersData,
		usersPagesNumbers: selectPagesNumbers(state),
		usersRequestData: state.usersPage.requestData,
		totalUsersCount: selectTotalUsersCount(state),
		isFetching: state.usersPage.isFetching,
	}
}


const mapDispatchToProps: MapDispatchPropsType = {
	setCurrentPage: usersActions.setCurrentPageAC,
	getUsers,
}
export default connect<MapStatePropsType, MapDispatchPropsType>(mapStateToProps, mapDispatchToProps)( 
	withNetworkRedirect(UsersListContainer) 
);