import { ProfileInfoType, ResultCodeEnum, UserCardType, AuthDataType, LoginDataType, UsersPageDataType, PhotosType } from './../types/types';
import axios, { AxiosResponse } from "axios";
import { setAvatar } from "../Redux/profile-reducer";

export const instance = axios.create({
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

export type GetUsersResponseDataType = UsersPageDataType;
export type FollowResponseDataType = ResponseDataType<boolean>;
export type UnfollowResponseDataType = ResponseDataType<any>
export type GetUserResponseDataType = ProfileInfoType;



export type GetAuthInfoResponseDataType = ResponseDataType<AuthDataType>;
export type LoginResponseDataType = ResponseDataType<{userId: number}>;
export type LogoutResponseDataType = ResponseDataType<{}>;

	

export type UpdateMyStatusResponseDataType = ResponseDataType<{}>;
export type GetUserStatusResponseDataType = ResponseDataType<string>;
export type SetAvatarResponseDataType = ResponseDataType<{photos: PhotosType}>;
export type SetMyProfileDataResponseType = ResponseDataType<{}>;


export type GetCaptchaResponseType = {
	url: string,
} 