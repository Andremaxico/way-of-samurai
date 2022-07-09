const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_VALUE = 'UPDATE-NEW-POST-VALUE';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_VALUE = 'UPDATE-NEW-MESSAGE-VALUE';

export const addPostActionCreator = () => {
	return {
		type: ADD_POST,
	}
}

export const addMessageActionCreator = () => {
	return {
		type: ADD_MESSAGE,
	}
}

export const updateNewPostValueActionCreator = (value) => {
	return {
		type: UPDATE_NEW_POST_VALUE,
		value: value
	}
}

export const updateNewMessageValueActionCreator = (value) => {
	return {
		type: UPDATE_NEW_MESSAGE_VALUE,
		value: value
	}
}

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
	subscribe(observer) {
		this._rerenderTree = observer;
	},

	//methods
	dispatch(action) {
		//add post
		if(action.type === ADD_POST) {
			const id = this._state.profilePage.postsData.length+1;
			const postText = this._state.profilePage.newPostText;
			const newPostData = {
				text: postText,
				likesCount: 0,
				id: id,
			}

			this._state.profilePage.postsData.unshift(newPostData);
			this._state.profilePage.newPostText = '';

		}
		//add post
		else if(action.type === ADD_MESSAGE) {
			const messageText = this._state.messagesPage.newMessageValue;
			const newMessageData = {
				text: messageText,
				isMy: true,
			}
		
			this._state.messagesPage.messagesData.push(newMessageData);
			this._state.messagesPage.newMessageValue = '';
		}
		//updateNewPostValue
		else if(action.type === UPDATE_NEW_POST_VALUE) {
			this._state.profilePage.newPostText = action.value;
		}
		//
		else if(action.type === UPDATE_NEW_MESSAGE_VALUE) {
			this._state.messagesPage.newMessageValue = action.value;
		}
		this._rerenderTree(this._state);
	}
}

export default store;