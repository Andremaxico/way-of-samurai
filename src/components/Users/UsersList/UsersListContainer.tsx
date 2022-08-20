import * as React from 'react';
import { connect } from "react-redux"
import withNetworkRedirect from '../../../hocs/withNetworkRedirect';
import { RootStateType } from '../../../Redux/redux-store';
import { follow, unfollow, setCurrentPageAC, getUsers
} from "../../../Redux/users-reducer";
import { selectPageSize, selectPagesNumbers, selectTotalUsersCount, selectUsersData } from '../../../Redux/users-selectors';
import { UserCardType } from '../../../types/types';
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
	getUsers: (currPageNum: number, pagesSizeNum: number) => void,
}
export type UsersListPropsType = MapStatePropsType & MapDispatchPropsType;

class UsersListContainer extends React.Component<UsersListPropsType> {
	props: UsersListPropsType;
	componentDidMount() {
		//get users data from server -> set to state
		this.props.getUsers(this.props.currentPage, this.props.pagesSize);
	}
	
	setCurrPage = (num: number): void => {
		//changes current users-page number
		this.props.setCurrentPage(num);

		this.props.getUsers(num, this.props.pagesSize);

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
	setCurrentPage: setCurrentPageAC,
	getUsers,
}
export default connect<MapStatePropsType, MapDispatchPropsType>(mapStateToProps, mapDispatchToProps)( 
	withNetworkRedirect(UsersListContainer) 
);