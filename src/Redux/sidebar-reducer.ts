import { usersAPI } from './../api/usersApi';
import { ThunkAction } from 'redux-thunk';
import { InferActionsType, RootStateType } from './redux-store';
import { UserCardType, GetUsersParamsType } from './../types/types';
import { AnyAction } from "redux";
import { FriendCardType, LinkType } from "../types/types";
import { Dispatch } from 'react';

export type SidebarStateType = {
	friendsData: Array<UserCardType> | null,
	friendsPageNum: number,
	friendsTotalCount: number | null,
	friendsPageSize: number,
	linksData: Array<LinkType>,
}

type ActionType = InferActionsType<typeof sidebarActions>;
type ThunkType = ThunkAction<void, RootStateType, unknown, ActionType>;
type DispatchType = Dispatch<ActionType | ThunkType>

const initialState: SidebarStateType = {
	friendsData: null,
	friendsPageNum: 1,
	friendsPageSize: 6,
	friendsTotalCount: null,
	linksData: [
		{
			path: '/profile',
			text: 'Profile',
		},
		{
			path: '/messages',
			text: 'Messages',
		},
		{
			path: '/news',
			text: 'News',
		},
		{
			path: '/music',
			text: 'Music',
		},
		{
			path: '/settings',
			text: 'Settings',
		},
	]
};

const sidebarReducer = (state = initialState, action: ActionType) => {
	switch (action.type) {
		case 'SET_FRIENDS':
			return {...state, friendsData: action.friendsData}
		case "sidebar/SET_CURRENT_PAGE": 
			return {...state, friendsPageNum: action.pageNum}
		case 'SET_TOTAL_FRIENDS_COUNT':
			return {...state, friendsTotalCount: action.count}
		default:
			return state;
	}
}

//===============ACTIONS=================
export const sidebarActions = {
	setFriends: (friendsData: Array<UserCardType> | null) => (
		{type: 'SET_FRIENDS', friendsData} as const
	),
	setCurrentPage: (pageNum : number) => (
		{type: 'sidebar/SET_CURRENT_PAGE', pageNum} as const
	),
	setTotalFriendsCount: (count: number) => (
		{type: 'SET_TOTAL_FRIENDS_COUNT', count} as const
	)
}

//===============THUNKS===================
export const getFriends = (params: GetUsersParamsType): ThunkType => async (dispatch: DispatchType) => {
	try {
		const data = await usersAPI.getUsersPage(params);
		console.log(data);
		if(data) {
			dispatch(sidebarActions.setFriends(data.items));
			dispatch(sidebarActions.setTotalFriendsCount(data.totalCount));
		}
	} catch(e) {
		console.log(e);
	}
}


export default sidebarReducer;