import messagesReducer, { deleteMessage } from './messages-reducer';

it('message should be deleted', () => {
	//1.data
	const action = deleteMessage(3);
	let state = {
		messagesData: [
			{
				text: 'Hi',
				isMy: true,
				id: 1
			},
			{
				text: 'How are you?',
				isMy: true,
				id: 2
			},
			{
				text: 'Where are you?',
				isMy: false,
				id: 3
			},
		],
	}
	//2.action
	state = messagesReducer(state, action);

	//3. expectation
	expect(state.messagesData[2]).toBe(undefined);
});

