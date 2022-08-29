import thunk from "redux-thunk";
import { FollowResponseDataType } from "../api/api";
import { usersAPI } from "../api/usersApi";
import { ResultCodeEnum } from "../types/types";
import { follow } from "./users-reducer";

jest.mock('../api/usersApi');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const followRequestResult: FollowResponseDataType = {
	resultCode: 0,
	messages: [],
	data: false,
}


usersAPIMock.follow.mockResolvedValue(followRequestResult);


describe('users thunks tests', () => {
	test('follow thunk must call dispatch 4 times', async () => { 
		const thunk = follow(2);
		const dispatchMock = jest.fn();
		const getStateMock = jest.fn();

		const res = await thunk(dispatchMock, getStateMock, {});

		expect(dispatchMock).toBeCalledTimes(4);
	})
});