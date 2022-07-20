import { usersAPI } from "../api/api";

const FOLLOW = 'follow';
const UNFOLLOW = 'unfollow';
const SET_USERS = 'set-users';
const SET_CURRENT_PAGE= 'set-current-page';
const SET_TOTAL_USERS_COUNT = 'set-total-users-count';
const TOGGLE_IS_FETCHING = 'toggle-is-fetching';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'toggle-following-is-progress';

const initialState = {
	usersData:  [],
	pagesSize: 6,
	totalUsersCount: 0,
	currentPage: 2,
	isFetching: false,
	followingInProgress : [],
}

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				usersData: state.usersData.map(user => {
					if (user.id === action.userId) {
						return {
							...user,
							followed: true,
						}
					}
					return user;
				})
			};
		case UNFOLLOW: 
			return {
				...state,
				usersData: state.usersData.map(user => {
					if (user.id === action.userId) {
						return {
							...user,
							followed: false,
						}
					}
					return user;
				})
			};
		case SET_USERS:
			return {
				...state, 
				usersData: [...action.users],
			};
		case SET_CURRENT_PAGE: 
			return {
				...state,
				currentPage: action.pageNumber,
			};
		case SET_TOTAL_USERS_COUNT: 
			return {
				...state,
				totalUsersCount: action.totalCount,
			};
		case TOGGLE_IS_FETCHING: 
			return {
				...state,
				isFetching: action.isFetching,
			};
		case TOGGLE_FOLLOWING_IN_PROGRESS:
			return {
				...state,
				followingInProgress: action.isInProgress 
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id != action.userId),
					
			};
		default:
			return state
	}
}

//Action creators
export const followSuccess = (userId) => {
	return {
		type: FOLLOW,
		userId: userId,
	}
}
export const unfollowSuccess = (userId) => {
	return {
		type: UNFOLLOW,
		userId: userId,
	}
}
export const setUsersAC = (users, totalUsersCount) => {
	return {
		type: SET_USERS,
		users: users,
	}
}
export const toggleIsFetchingAC = (isFetching) => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching,
	}
}
export const setCurrentPageAC = (pageNumber) => {
	return {
		type: SET_CURRENT_PAGE,
		pageNumber,
	}
}
export const setTotalUsersCountAC = (totalCount) => {
	return {
		type: SET_TOTAL_USERS_COUNT,
		totalCount,
	}
}
export const toggleFollowingInProgress = (isInProgress, userId) => {
	return {
		type: TOGGLE_FOLLOWING_IN_PROGRESS,
		isInProgress,
		userId,
	}
}

//thunks
export const getUsers = (currentPage, pagesSize) => (dispatch) => {
	dispatch(toggleIsFetchingAC(true));
	usersAPI.getUsersPage(currentPage, pagesSize).then(res => {
		dispatch(setUsersAC(res.items));
		dispatch(setTotalUsersCountAC(res.totalCount));
		dispatch(toggleIsFetchingAC(false));
	})
}
export const follow = (userId) => (dispatch) => {
	dispatch(toggleFollowingInProgress(true, userId));
	usersAPI.follow(userId).then(res => {
		if(res.resultCode === 0) {
			dispatch(followSuccess(userId));
			dispatch(toggleFollowingInProgress(false, userId));
		}
	})
}
export const unfollow = (userId) => (dispatch) => {
	dispatch(toggleFollowingInProgress(true, userId));
	usersAPI.unfollow(userId).then(res => {
		if(res.resultCode === 0) {
			dispatch(unfollowSuccess(userId));
			dispatch(toggleFollowingInProgress(false, userId));
		}
	})
}

export default usersReducer;