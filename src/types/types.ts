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