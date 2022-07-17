const FOLLOW = 'follow';
const UNFOLLOW = 'unfollow';
const SET_TOTAL_USERS_COUNT = 'set-total-users-count';
const SET_USERS = 'set-users';
const TOGGLE_IS_FETCHING = 'toggle-is-fetching';
const SET_CURRENT_PAGE = 'set-current-page';

const initialState = {
	usersData: [],
	currentPage: 1,
	pageSize: 6,
	totalUsersCount: 0,
	isFetching: false,
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

export const follow = (userId) => {
	return {
		type: FOLLOW,
		userId,
	}
}
export const unfollow = (userId) => {
	return {
		type: UNFOLLOW,
		userId,
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

export default usersReducer;