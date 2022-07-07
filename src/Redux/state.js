let rerenderTree = () => {}
let state = {
	profilePage: {
		postsData: [
			{
				text: 'Hi',
				likesCount: 0,
				id: 5,
			},
			{
				text: 'How are you?',
				likesCount: 0,
				id: 4,
			},
			{
				text: 'Where are you?',
				likesCount: 5,
				id: 3,
			},
			{
				text: 'Want to home?...',
				likesCount: 8,
				id: 2,
			},
			{
				text: 'Me too...:(',
				likesCount: 6,
				id: 1,
			},
		],
		newPostText: '',
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
		newMessageValue: '',
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

//
export const addPost = () => {
	const id = state.profilePage.postsData.length+1;
	const postText = state.profilePage.newPostText;
	const newPostData = {
		text: postText,
		likesCount: 0,
		id: id,
	}

	state.profilePage.postsData.unshift(newPostData);
	state.profilePage.newPostText = '';

	rerenderTree(state);
} 

//pushs message-data to state
export const addMessage = () => {
	const messageText = state.messagesPage.newMessageValue;
	const newMessageData = {
		text: messageText,
		isMy: true,
	}

	state.messagesPage.messagesData.push(newMessageData);
	state.messagesPage.newMessageValue = '';

	rerenderTree(state);
}

//updates current new post value
export const updateNewPostValue = (value) => {
	state.profilePage.newPostText = value;
	rerenderTree(state);
}

//update current new message value
export const updateNewMessageValue = (value) => {
	state.messagesPage.newMessageValue = value;

	rerenderTree(state);
}

export const setRerenderFn = (observer) => {
	rerenderTree = observer;
}
export default state;