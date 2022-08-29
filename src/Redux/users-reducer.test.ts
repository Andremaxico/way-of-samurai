import usersReducer, { UsersStateType, follow, usersActions } from './users-reducer';
describe(('users reducers tests'), () => {
	let state: UsersStateType = {
		usersData: [
			{
				followed: false, name: 'FIrst', photos: {large: 'type', small: 'url'}, 
				uniqueUrlName: 'url', status: 'test', id: 1
			},
			{
				followed: true, name: 'false', photos: {large: 'url1', small: 'url2'}, 
				uniqueUrlName: 'url2', status: 'test2', id: 2
			},
		], 
		requestData: {
			pageNum: 1,
			pagesSize: 1,
			term: 'Username',
			friend: false,
		},
		followingInProgress: [],
		isFetching: false,
		totalUsersCount: 3,
	}
	beforeEach(() => {
		state =  {
			usersData: [
				{
					followed: false, name: 'FIrst', photos: {large: 'type', small: 'url'}, 
					uniqueUrlName: 'url', status: 'test', id: 1
				},
				{
					followed: true, name: 'false', photos: {large: 'url1', small: 'url2'}, 
					uniqueUrlName: 'url2', status: 'test2', id: 2
				},
			], 
			requestData: {
				pageNum: 1,
				pagesSize: 1,
				term: 'Username',
				friend: false,
			},
			followingInProgress: [],
			isFetching: false,
			totalUsersCount: 3,
		}
	});

	test('user must be folowed', () => { 
		const userId = state.usersData[0].id;
		const action = usersActions.followSuccess(userId);
		const newState = usersReducer(state, action);

		expect(newState.usersData[1].followed).toBeTruthy();
		expect(newState.usersData[0].followed).toBeTruthy();
	});
	test('user must be unfolowed', () => { 
		const userId = state.usersData[1].id;
		const action = usersActions.unfollowSuccess(userId);
		const newState = usersReducer(state, action);

		expect(newState.usersData[1].followed).toBeFalsy();
		expect(newState.usersData[0].followed).toBeFalsy();
	});
});
