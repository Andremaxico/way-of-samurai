const FOLLOW = 'follow';
const UNFOLLOW = 'unfollow';
const SET_USERS = 'set-users';

const initialState = {
	usersData:  [],
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
							isFollowed: true,
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
							isFollowed: false,
						}
					}
					return user;
				})
			};
		case SET_USERS:
			return {...state, usersData: [...state.usersData, ...action.users]}
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
export const setUsersAC = (users) => {
	return {
		type: SET_USERS,
		users: users,
	}
}

export default usersReducer;