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
	usersData: Array<UserCardType>,
	usersPagesNumbers: Array<number>,
	totalUsersCount: number,
	pagesSize: number,
	currentPage: number,
	isFetching: boolean,
	followingInProgress: Array<number>,
}
type MapDispatchPropsType = {
	follow: (userId: number) => void,
	unfollow: (userId: number) => void,
	setCurrentPage: (pageNum: number) => void,
	getUsers: ({pageNum, ...params}: GetUsersParamsType) => void,
}
export type UsersListPropsType = MapStatePropsType & MapDispatchPropsType;

class UsersListContainer extends React.Component<UsersListPropsType> {
	props: UsersListPropsType;
	componentDidMount() {
		//get users data from server -> set to state
		const getUsersParams: GetUsersParamsType = {
			pageNum: this.props.currentPage,
			pagesSize: this.props.pagesSize
		}
		this.props.getUsers(getUsersParams);
	}
	
	setCurrPage = (num: number): void => {
		const getUsersParams: GetUsersParamsType = {
			pageNum: num,
			pagesSize: this.props.pagesSize,
		}
		//changes current users-page number
		this.props.setCurrentPage(num);
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
		usersData: selectUsersData(state),
		usersPagesNumbers: selectPagesNumbers(state),
		totalUsersCount: selectTotalUsersCount(state),
		pagesSize: selectPageSize(state),
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		followingInProgress: state.usersPage.followingInProgress,
	}
}


const mapDispatchToProps: MapDispatchPropsType = {
	follow,
	unfollow,
	setCurrentPage: usersActions.setCurrentPageAC,
	getUsers,
}
export default connect<MapStatePropsType, MapDispatchPropsType>(mapStateToProps, mapDispatchToProps)( 
	withNetworkRedirect(UsersListContainer) 
);