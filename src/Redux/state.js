const store = {
	_rerenderTree() {
		console.error('set subscriber fn');
	},
	_state: {
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
	},

	getState() {
		return this._state;
	},

	addPost() {
		const id = this._state.profilePage.postsData.length+1;
		const postText = this._state.profilePage.newPostText;
		const newPostData = {
			text: postText,
			likesCount: 0,
			id: id,
		}

		this._state.profilePage.postsData.unshift(newPostData);
		this._state.profilePage.newPostText = '';

		this._rerenderTree(this._state);
	},

	addMessage() {
		const messageText = this._state.messagesPage.newMessageValue;
		const newMessageData = {
			text: messageText,
			isMy: true,
		}
	
		this._state.messagesPage.messagesData.push(newMessageData);
		this._state.messagesPage.newMessageValue = '';
	
		this._rerenderTree(this._state);
	},
	
	//updates current new post value
	updateNewPostValue(value)  {
		this._state.profilePage.newPostText = value;
		this._rerenderTree(this._state);
	},
	
	//update current new message value
	updateNewMessageValue (value)  {
		this._state.messagesPage.newMessageValue = value;
		this._rerenderTree(this._state);
	},

	subscribe(observer) {
		this._rerenderTree = observer;
	},
}

export default store;