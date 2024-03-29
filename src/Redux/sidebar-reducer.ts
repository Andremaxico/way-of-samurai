type FriendCardType = {
	avatarUrl: string | null,
	name: string | null,
	id: number,
}
type LinkType = {
	path: string,
	text: string,
}

export type SidebarStateType = {
	friendsData: Array<FriendCardType>,
	linksData: Array<LinkType>,
}

const initialState: SidebarStateType = {
	friendsData: [
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'Andriy',
			id: 1,
		},
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'Ivan',
			id: 2,
		},
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'Vasya',
			id: 3,
		},
		{
			avatarUrl: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg',
			name: 'David',
			id: 4,
		},
	],
	linksData: [
		{
			path: '/profile',
			text: 'Profile',
		},
		{
			path: '/messages',
			text: 'Messages',
		},
		{
			path: '/news',
			text: 'News',
		},
		{
			path: '/music',
			text: 'Music',
		},
		{
			path: '/settings',
			text: 'Settings',
		},
	]
};

const sidebarReducer = (state = initialState, action: any) => {
	return state;
}

export default sidebarReducer;