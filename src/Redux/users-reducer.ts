import { FollowResponseDataType, UnfollowResponseDataType } from './../api/api';
import { ThunkAction } from 'redux-thunk';
import { UserCardType, ResultCodeEnum, GetUsersParamsType } from './../types/types';
import { usersAPI } from "../api/usersApi";
import changeArrayObjProps from '../utils/helpers/objHelper';
import { appActions } from "./app-reducer";
import { Dispatch } from 'react';
import { RootStateType, InferActionsType } from './redux-store';

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

type ActionType = InferActionsType<typeof usersActions>;
type ImportedActions = ReturnType<typeof appActions.setNetworkError>;

type DispatchType = Dispatch<ActionType | ImportedActions>;
type ThunkType = ThunkAction<void, RootStateType, unknown, ActionType>;					

type _FollowSuccessType = ReturnType<typeof usersActions.followSuccess>;
type _UnfollowSuccessType = ReturnType<typeof usersActions.unfollowSuccess>;

type FollowUnfollowResponseType = Promise<FollowResponseDataType> | Promise<UnfollowResponseDataType>;

//flow
const followUnfollowFlow = async (
	apiMethod: (userId: number) => FollowUnfollowResponseType, actionCreator: _FollowSuccessType | _UnfollowSuccessType, 
	dispatch: DispatchType, userId: number
): Promise<void>  => {
	try {
		dispatch(usersActions.toggleFollowingInProgress(true, userId));
	
		const res = await apiMethod(userId);
	
		if(res.resultCode === ResultCodeEnum.Success) {
			dispatch(actionCreator);
			dispatch(usersActions.toggleFollowingInProgress(false, userId));
			dispatch(appActions.setNetworkError(false));
		}
	} catch (e) {
		if(e.code === "ERR_NETWORK") dispatch(appActions.setNetworkError(true));
	}
}

//============================REDUCER=================================
const usersReducer = (state   = initialState, action: ActionType): UsersStateType  => {
	switch (action.type) {
		case 'FOLLOW':
			return {
				...state,
				usersData: changeArrayObjProps(state.usersData, action.userId, {followed: true}),
			};
		case 'UNFOLLOW': 
			return {
				...state,
				usersData: changeArrayObjProps(state.usersData, action.userId, {followed: false}),
			};
		case 'SET_USERS':
			return {
				...state, 
				usersData: [...action.users],
			};
		case 'SET_CURRENT_PAGE': 
			return {
				...state,
				currentPage: action.pageNumber,
			};
		case 'SET_TOTAL_USERS_COUNT': 
			return {
				...state,
				totalUsersCount: action.totalCount,
			};
		case 'TOGGLE_IS_FETCHING': 
			return {
				...state,
				isFetching: action.isFetching,
			};
		case 'TOGGLE_FOLLOWING_IN_PROGRESS':
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

//========================ACTION CREATORS===============================
export const usersActions = {

	//chnage following status of users in usersData
	followSuccess: (userId: number) => ({
		type: 'FOLLOW',
		userId,
	} as const),

	unfollowSuccess: (userId: number) => ({
		type: 'UNFOLLOW',
		userId,
	} as const),

	//change users data[] in state

	setUsersAC: (users: Array<UserCardType>) => ({
		type: 'SET_USERS',
		users,
	} as const),

	//chnage fetching status
	toggleIsFetchingAC: (isFetching: boolean) => ({
		type: 'TOGGLE_IS_FETCHING',
		isFetching,
	} as const),


	//change pages number: number in state
	setCurrentPageAC: (pageNumber: number) => ({
		type: 'SET_CURRENT_PAGE',
		pageNumber,
	} as const),

	//chngae total user count: number in state

	setTotalUsersCountAC: (totalCount: number) => ({
		type: 'SET_TOTAL_USERS_COUNT',
		totalCount,
	} as const),

	// change fething status of following progress in elements array[]
	toggleFollowingInProgress:  (isInProgress: boolean, userId: number) => ({
		type: 'TOGGLE_FOLLOWING_IN_PROGRESS',
		isInProgress,
		userId,
	} as const),
}
//========================THUNKS============================
export const getUsers = ({...params}: GetUsersParamsType): ThunkType => async (dispatch: DispatchType) => {
	dispatch(usersActions.toggleIsFetchingAC(true));
	try {
		const res = await usersAPI.getUsersPage(params);
		dispatch(usersActions.setUsersAC(res.items));
		dispatch(usersActions.setTotalUsersCountAC(res.totalCount));
		dispatch(usersActions.toggleIsFetchingAC(false));
		dispatch(appActions.setNetworkError(false));
	} catch (e) {
		if(e.code === "ERR_NETWORK") dispatch(appActions.setNetworkError(true));
	}
}
export const follow = (userId: number): ThunkType => async (dispatch: DispatchType) => {
	followUnfollowFlow(usersAPI.follow.bind(usersAPI), usersActions.followSuccess(userId), dispatch, userId);
}
export const unfollow = (userId: number): ThunkType => async (dispatch: DispatchType) => {
	followUnfollowFlow(usersAPI.unfollow, usersActions.unfollowSuccess(userId), dispatch, userId);
}

export default usersReducer;