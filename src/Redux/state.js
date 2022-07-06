const state = {
	profilePage: {
		postsData: [
			{
				text: 'Hi',
				likesCount: 0,
			},
			{
				text: 'How are you?',
				likesCount: 0,
			},
			{
				text: 'Where are you?',
				likesCount: 5,
			},
			{
				text: 'Want to home?...',
				likesCount: 8,
			},
			{
				text: 'Me too...:(',
				likesCount: 6,
			},
		],
	},
	messagesPage: {
		usersInfo: [
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
		messagesData: [
			{
				text: 'Hi',
				isMy: true,
			},
			{
				text: 'How are you?',
				isMy: true,
			},
			{
				text: 'Where are you?',
				isMy: false,
			},
			{
				text: 'Want to home?...',
				isMy: true,
			},
			{
				text: 'Me too...:(',
				isMy: false,
			},
		],
	},
	sidebar: {
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
	}
}
export default state;