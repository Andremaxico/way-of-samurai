import { createSelector } from 'reselect';

export const selectUsersData = (state) => {
	return state.usersPage.usersData;
}

export const selectUnfollowedUsersData = createSelector(selectUsersData, (usersData) => {
	return usersData.filter(user => !user.followed);
});

export const selectTotalUsersCount = (state) => {
	return state.usersPage.totalUsersCount;
}
export const selectPageSize = (state) => {
	return state.usersPage.pagesSize;
}

export const selectPagesNumbers = createSelector(
	selectTotalUsersCount, 
	selectPageSize, (totalUsersCount, pageSize) => {
		const totalPagesCount = Math.ceil(totalUsersCount / pageSize);
		let pagesNumbers = [];
	
		for(let i = 1; i <= totalPagesCount; i++) {
			pagesNumbers.push(i);
		} 

		return pagesNumbers;
	} 
);