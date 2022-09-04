import { DeepMap, FieldError, FieldValues } from "react-hook-form"
import { To } from "react-router-dom"

//post on profile page
export type PostDataType = {
	text: string,
	likesCount: number,
	id: number,
}

//profile info photos{}
export type PhotosType = {
	small: string,
	large: string,
}

//profile info contacts{}
export type ContactsType = {
	github: string,
	vk: string,
	facebook: string,
	instagram: string,
	twitter: string,
	website: string,
	youtube: string,
	mainLink: string,
}

//profile info on profile page
export type ProfileInfoType = {
	aboutMe: string,
	userId: number,
	lookingForAJob: boolean,
	lookingForAJobDescription: string,
	fullName: string,
	contacts: ContactsType,
	photos: PhotosType,
	followed: boolean,
	isMyProfile: boolean,
}

//when we search users, user card
export type UserCardType = {
	followed: boolean,
	name: string,
	photos: PhotosType,
	uniqueUrlName: string | null,
	status: string | null,
	id: number,
}

//frind name, friend avatar type
export type FriendCardType = {
	avatarUrl: string | undefined,
	name: string | null,
	id: number,
}

//link's path and text
export type LinkType = {
	path: string,
	text: string,
}

export type FormFieldErrorType = {
	message?: string | null
}

//========================FORM TYPIZATION=====================
//form state of react-hook-form
export type FormStateType = {
	errors?: {[index: string]:any} & FieldErrors,
	isValidating?: boolean,
}

export type ReactHookFormType = {
	register: any, 
	handleSubmit: any, 
	watch?: (name: string) => string, 
	setFocus?: any,
	formState?: FormStateType, 
	setError?: any, 
	clearErrors?: any
}

export interface HookFormInterface {

}

export type FieldErrors<
  TFieldValues extends FieldValues = FieldValues
> = DeepMap<TFieldValues, FieldError>;

//logjn , email, password
export type AuthDataType = {
	login: string | null,
	email: string | null,
	id: number | null,
}


//for login to account
export type LoginDataType = {
	email: string, 
	password: string, 
	rememberMe: boolean,
	captcha: string, 
}

//at messages page, user that you have a chat
export type UserInfoType = {
	avatarUrl: string,
	name: string,
	id: number
}

//message in chat
export type MessageDataType = {
	message: string,
	photo: string,
	userId: number,
	username: string,
	isMy?: boolean,
}


//==============API TYPES================
export enum ResultCodeEnum {
	Success = 0,
	Error = 1,
	CaptchaRequired = 10,
}

export type UsersPageDataType = {
	items: Array<UserCardType>,
	totalCount: number,
	error?: string | null, 
}

//with router
declare function useNavigate(): NavigateFunction;

interface NavigateFunction {
  (
    to: To,
    options?: { replace?: boolean; state?: any }
  ): void;
  (delta: number): void;
}
export type RouterParamsType = {
	userId?: number,
	isFollowed: isFollowedType,
}
interface Location {
	pathname: string;
	search: string;
	hash: string;
	state: unknown;
	key: string;
 }
export type RouterPropsType = {
	router: {
		params: RouterParamsType,
		location?: Location,
		navigate?: NavigateFunction,
	}
}

//=======================USERS TYPES===================
export type GetUsersParamsType = {
	pageNum: number, pagesSize: number, 
	term: string, friend: isFriendType
}
export type isFriendType = boolean | null;
export type isFollowedType = 'true' | 'false' | boolean | null;