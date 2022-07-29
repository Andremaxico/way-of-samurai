import profileReducer, { addPost } from './profile-reducer';

it(`Is post added`, () => {
	//1.data
	let state = {
		postsData: [
			{
				text: 'Hi',
				likesCount: 0,
				id: 5,
			},
			{
				text: 'How are you?',
				likesCount: 0,
				id: 4,
			},
		],
	}
	const action = addPost('lalala');

	//2.action
	state =  profileReducer(state, action);

	//.expectation
	expect(state.postsData.length).toBe(3);
})