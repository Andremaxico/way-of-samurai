import { ProfileInfoType } from "../types/types";
import { GetUserStatusResponseDataType, instance, SetAvatarResponseDataType, SetMyProfileDataResponseType, UpdateMyStatusResponseDataType } from "./api";

export const profileAPI = {
	async updateMyStatus(status: string) {
		const res = await instance.put<UpdateMyStatusResponseDataType>('/profile/status', {status})
		return res.data;
	},

	async getUserStatus(userId: number) {
		return instance.get<GetUserStatusResponseDataType>(`/profile/status/${userId}`)
		.then(res => res.data).catch(e => e.message);
	},

	async setAvatar(file: any) {
		const formData = new FormData();
		formData.append('image', file);

		return instance.put<SetAvatarResponseDataType>('/profile/photo', formData, {
			headers: {
				'Content-type':'multiport/form-data',
			}
		}).then(res => res.data);
	},

	async setMyProfileData(data: ProfileInfoType) {
		const res = await instance.put<SetMyProfileDataResponseType>('/profile', {...data})
		return res.data;
	}
}