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
	followed?: boolean,
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