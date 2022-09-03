import { RootStateType } from './redux-store';

export const selectFriendsData = (state: RootStateType) => {
	return state.sidebar.friendsData;
}
export const selectFriendsRequestData = (state: RootStateType) => {
	return {
		pageNum: state.sidebar.friendsPageNum,
		pagesSize: state.sidebar.friendsPageSize,
	}
}
export const selectTotalFriendsCount = (state: RootStateType) => {
	return state.sidebar.friendsTotalCount
}

export const selectLinksData = (state: RootStateType) => {
	return state.sidebar.linksData;
}