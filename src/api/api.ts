import { ProfileInfoType, ResultCodeEnum, UserCardType, AuthDataType, LoginDataType, UsersPageDataType, PhotosType } from './../types/types';
import axios, { AxiosResponse } from "axios";
import { setAvatar } from "../Redux/profile-reducer";

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	withCredentials: true,
	headers: {
		"API-KEY": "df1aa1db-d489-4abc-9e0f-8cdb985073d7", 
	},
});

type ResponseDataType<DataType> = {
	data: DataType,
	messages: Array<string>,
	resultCode: ResultCodeEnum,
}

type GetUsersResponseDataType = UsersPageDataType;
type FollowResponseDataType = ResponseDataType<boolean>;
type UnfollowResponseDataType = ResponseDataType<any>
type GetUserResponseDataType = ResponseDataType<ProfileInfoType>

export const usersAPI = {
	async getUsersPage(pageNum: number, pagesSize: number)  {
		return instance.get<GetUsersResponseDataType>(`/users?page=${pageNum}&count=${pagesSize}`).then(res => {
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
		return instance.get<GetUserResponseDataType>(`/profile/${userId}`).then(res => res.data);
	},
}

type GetAuthInfoResponseDataType = ResponseDataType<AuthDataType>;
type LoginResponseDataType = ResponseDataType<{userId: number}>;
type LogoutResponseDataType = ResponseDataType<{}>;

export const authAPI = {
	async getAuthInfo() {
		return instance.get<GetAuthInfoResponseDataType>('/auth/me').then(res => res.data);
	},

	async login(data: LoginDataType) {
		return instance.post<LoginResponseDataType>(`/auth/login`, {...data}).then(res => res.data);
	},

	async logout() {
		return instance.delete<LogoutResponseDataType>('/auth/login').then(res => res.data);
	}
}	

type UpdateMyStatusResponseDataType = ResponseDataType<{}>;
type GetUserStatusResponseDataType = ResponseDataType<string>;
type SetAvatarResponseDataType = ResponseDataType<{photos: PhotosType}>;
type SetMyProfileDataResponseType = ResponseDataType<{}>;

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

export type getCaptchaResponseType = {
	url: string,
} 
export const securityAPI = {
	async getCaptchaUrl() {
		return instance.get<getCaptchaResponseType>('/security/get-captcha-url').then(res => res.data);
	}
}