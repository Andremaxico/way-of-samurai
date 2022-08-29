import { RootStateType } from './redux-store';
import { createSelector } from 'reselect';
import { UserCardType } from '../types/types';

export const selectUsersData = (state: RootStateType): Array<UserCardType> => {
	return state.usersPage.usersData;
}

export const selectUnfollowedUsersData = createSelector(selectUsersData, (usersData): Array<UserCardType> => {
	return usersData.filter(user => !user.followed);
});

export const selectTotalUsersCount = (state: RootStateType): number => {
	return state.usersPage.totalUsersCount;
}
export const selectPageSize = (state: RootStateType): number => {
	return state.usersPage.requestData.pagesSize;
}

export const selectPagesNumbers = createSelector(
	selectTotalUsersCount, 
	selectPageSize, (totalUsersCount, pageSize): Array<number> => {
		const totalPagesCount = Math.ceil(totalUsersCount / pageSize);
		let pagesNumbers = [];
	
		for(let i = 1; i <= totalPagesCount; i++) {
			pagesNumbers.push(i);
		} 

		return pagesNumbers;
	} 
);