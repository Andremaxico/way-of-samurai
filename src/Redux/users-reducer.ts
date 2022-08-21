import { PhotosType, UserCardType } from './../types/types';
import { usersAPI } from "../api/api";
import { changeObjOfArrayProps } from '../utils/helpers/objHelper';
import { setNetworkError } from "./app-reducer";
import { AppDispatch } from './redux-store';
import { AnyAction } from 'redux';

//=================ACTIONS VARIABLES=================

const FOLLOW = 'follow';
const UNFOLLOW = 'unfollow';
const SET_USERS = 'set-users';
const SET_CURRENT_PAGE= 'set-current-page';
const SET_TOTAL_USERS_COUNT = 'set-total-users-count';
const TOGGLE_IS_FETCHING = 'toggle-is-fetching';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'toggle-following-is-progress';

//==================TYPES=============

//==================INIT STATE, REDUCER================
const initialState = {
	usersData: [{}] as Array<UserCardType>,
	pagesSize: 6 as number,
	totalUsersCount: 0 as number,
	currentPage: 2 as number,
	isFetching: false as boolean,
	followingInProgress : [] as Array<number>,
}

export type UsersStateType = typeof initialState;

//flow
const followUnfollowFlow = async (apiMethod: any, actionCreator: any, dispatch: any, userId: number) => {
	try {
		dispatch(toggleFollowingInProgress(true, userId));
	
		const res = await apiMethod(userId);
	
		if(res.resultCode === 0) {
			dispatch(actionCreator);
			dispatch(toggleFollowingInProgress(false, userId));
			dispatch(setNetworkError(false));
		}
	} catch (e) {
		if(e.code === "ERR_NETWORK") dispatch(setNetworkError(true));
	}
}

//reducer
const usersReducer = (state = initialState, action: AnyAction): UsersStateType  => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				usersData: changeObjOfArrayProps(state.usersData, action.userId, {followed: true}),
			};
		case UNFOLLOW: 
			return {
				...state,
				usersData: changeObjOfArrayProps(state.usersData, action.userId, {followed: false}),
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

//========================ACTION CREATORS===============
//chnage following status of users in usersData
type FollowSuccessActionType = {
	type: typeof FOLLOW,
	userId: number,
}
export const followSuccess = (userId: number): FollowSuccessActionType => {
	return {
		type: FOLLOW,
		userId,
	}
}

type UnfollowSuccessActionType = {
	type: typeof UNFOLLOW,
	userId: number,
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => {
	return {
		type: UNFOLLOW,
		userId,
	}
}

//change users data[] in state
type SetUsersActionType = {
	type: typeof SET_USERS,
	users: Array<UserCardType>,
}
export const setUsersAC = (users: Array<UserCardType>): SetUsersActionType => {
	return {
		type: SET_USERS,
		users,
	}
}

//chnage fetching status
type ToggleIsFetchingActionType = {
	type: typeof TOGGLE_IS_FETCHING,
	isFetching: boolean,
}
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingActionType => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
})


//change pages number: number in state
type SetCurrentPageActionType  = {
	type: typeof SET_CURRENT_PAGE,
	pageNumber: number,
}
export const setCurrentPageAC = (pageNumber: number): SetCurrentPageActionType => ({
	type: SET_CURRENT_PAGE,
	pageNumber,
});

//chngae total user count: number in state
type SetTotalUserCountActionType = {
	type: typeof SET_TOTAL_USERS_COUNT,
	totalCount: number,
}

export const setTotalUsersCountAC = (totalCount: number): SetTotalUserCountActionType => ({
	type: SET_TOTAL_USERS_COUNT,
	totalCount,
});

// change fething status of following progress in elements array[]
type ToggleFollowingInProgressActionType = {
	type: typeof TOGGLE_FOLLOWING_IN_PROGRESS,
	isInProgress: boolean,
	userId: number,
}
export const toggleFollowingInProgress = (isInProgress: boolean, userId: number): ToggleFollowingInProgressActionType => ({
	type: TOGGLE_FOLLOWING_IN_PROGRESS,
	isInProgress,
	userId,
})

//========================THUNKS============================
export const getUsers = (currentPage: number, pagesSize: number) => async (dispatch: any) => {
	dispatch(toggleIsFetchingAC(true));
	try {
		const res = await usersAPI.getUsersPage(currentPage, pagesSize);
		dispatch(setUsersAC(res.items));
		dispatch(setTotalUsersCountAC(res.totalCount));
		dispatch(toggleIsFetchingAC(false));
		dispatch(setNetworkError(false));
	} catch (e) {
		if(e.code === "ERR_NETWORK") dispatch(setNetworkError(true));
	}
}
export const follow = (userId: number) => async (dispatch: any) => {
	followUnfollowFlow(usersAPI.follow.bind(usersAPI), followSuccess(userId), dispatch, userId);
}
export const unfollow = (userId: number) => async (dispatch: any) => {
	followUnfollowFlow(usersAPI.unfollow, unfollowSuccess(userId), dispatch, userId);
}

export default usersReducer;