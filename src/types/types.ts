
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
	isMyProfile?: boolean,
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

//form state of react-hook-form
export type FormStateType = {
	errors?: {[index: string]:any},
	isValidating?: boolean,
}

//useForm() -> typization
export type ReactHookFormType = {
	register: any, 
	handleSubmit: any, 
	watch: any, 
	setFocus: any,
	formState: FormStateType, 
	setError: any, 
	clearErrors: any
}
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
	remeberMe: boolean,
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
	text: string,
	isMy: boolean,
	id: number,
}