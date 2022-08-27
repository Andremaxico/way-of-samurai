import { GetUsersParamsType } from './../types/types';
import { instance, GetUsersResponseDataType, FollowResponseDataType, UnfollowResponseDataType, GetUserResponseDataType } from "./api";

export const usersAPI = {
	async getUsersPage({pageNum, pagesSize, term, friend}: GetUsersParamsType)  {
		return instance.get<GetUsersResponseDataType>(
			`/users?page=${pageNum}&count=${pagesSize}${term ? '&term=' + term : ''}${friend ? '&friend='+friend : ''}`
		).then(res => {
			return res.data;
		});
	},
	async follow(userId: number) {
		return instance.post<FollowResponseDataType>(`/follow/${userId}`).then(res => res.data);
	},
	async unfollow(userId: number) {
		return instance.delete<UnfollowResponseDataType>(`/follow/${userId}`).then(res => res.data);
	},
	async getUserById(userId: number | null) {
		const res = await instance.get<GetUserResponseDataType>(`/profile/${userId}`);
		console.log('api', res);
		return res.data;
	},
}