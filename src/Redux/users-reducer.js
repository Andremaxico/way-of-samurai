const FOLLOW = 'follow';
const UNFOLLOW = 'unfollow';
const SET_USERS = 'set-users';
const SET_CURRENT_PAGE= 'set-current-page';
const SET_TOTAL_USERS_COUNT = 'set-total-users-count';
const TOGGLE_IS_FETCHING = 'toggle-is-fetching';

const initialState = {
	usersData:  [],
	pagesSize: 6,
	totalUsersCount: 0,
	currentPage: 2,
	isFetching: false,
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
		
		default:
			return state
	}
}

export const followAC = (userId) => {
	return {
		type: FOLLOW,
		userId: userId,
	}
}
export const unfollowAC = (userId) => {
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

export default usersReducer;