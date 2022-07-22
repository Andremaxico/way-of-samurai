import { usersAPI } from '../api/api';

const FOLLOW = 'follow';
const UNFOLLOW = 'unfollow';
const SET_TOTAL_USERS_COUNT = 'set-total-users-count';
const SET_USERS = 'set-users';
const TOGGLE_IS_FETCHING = 'toggle-is-fetching';
const SET_CURRENT_PAGE = 'set-current-page';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'toggle-following-in-progress';

const initialState = {
	usersData: [],
	currentUserData: {},
	currentPage: 1,
	pageSize: 6,
	totalUsersCount: 0,
	isFetching: false,
	followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				usersData: state.usersData.map(user => {
					if(user.id === action.userId) {
						return {...user, followed: true}
					}
					return user;
				}),
			}
		case UNFOLLOW:
			return {
				...state,
				usersData: state.usersData.map(user => {
					if(user.id === action.userId) {
						return {...user, followed: false}
					}
					return user;
				}),
			}
		case TOGGLE_FOLLOWING_IN_PROGRESS: 
			return {
				...state,
				followingInProgress: action.isInProgress 
					? [...state.followingInProgress, action.userId ]  
					: state.followingInProgress.filter((id) => id !== action.userId),
			}
		case SET_TOTAL_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.totalUsersCount,
			}
		case SET_USERS: 
			return {
				...state,
				usersData: [...action.usersData]
			}
		case TOGGLE_IS_FETCHING: 
			return {
				...state,
				isFetching: action.isFetching,
			}
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage,
			}
		default:
			return state;
	}
}

export const followAC = (userId, isPending) => {
	return {
		type: FOLLOW,
		userId,
		isPending,
	}
}
export const unfollowAC = (userId, isPending) => {
	return {
		type: UNFOLLOW,
		userId,
		isPending,
	}
}
const toggleFollowingInProgress = (userId, isInProgress) => {
	return {
		type: TOGGLE_FOLLOWING_IN_PROGRESS,
		userId,
		isInProgress,
	}
}
export const setTotalUsersCount = (totalUsersCount) => {
	return {
		type: SET_TOTAL_USERS_COUNT,
		totalUsersCount,
	}
}
export const setUsers = (usersData) => {
	return {
		type: SET_USERS,
		usersData,
	}
}
export const toggleIsFetching = (isFetching) => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching,
	}
}
export const setCurrentPage = (currentPage) => {
	return {
		type: SET_CURRENT_PAGE,
		currentPage,
	}
}

//thunks creator
export const setUsersPage = (currentPage, pageSize) => (dispatch) => {
	dispatch(toggleIsFetching(true));

	usersAPI.getUsersPage(currentPage, pageSize).then(res => {
		dispatch(setTotalUsersCount(res.totalCount));
		dispatch(setUsers(res.items));
		dispatch(toggleIsFetching(false));
	});
}	

export const follow = (userId) => (dispatch) => {
	dispatch(toggleFollowingInProgress(userId, true));
	usersAPI.follow(userId).then(res => {
		if(res.resultCode === 0) {
			dispatch(followAC(userId));
		}
		dispatch(toggleFollowingInProgress(userId, false));
	})
}
export const unfollow = (userId) => (dispatch) => {
	dispatch(toggleFollowingInProgress(userId, true));

	usersAPI.unfollow(userId).then(res => {
		if(res.resultCode === 0) {
			dispatch(unfollowAC(userId));
		}
		dispatch(toggleFollowingInProgress(userId, false));
	})
}

export const setUserById = (userId) => (dispatch) => {
	dispatch(toggleIsFetching(true));

	usersAPI.getUserById(userId).then(res => {

	});
}



export default usersReducer;