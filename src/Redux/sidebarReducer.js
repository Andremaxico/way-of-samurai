const initialState = {
	linksData: [
		{
			text: 'Profile',
			path: '/profile',
			id: 1,
		},
		{
			text: 'Messages',
			path: '/messages',
			id: 2,
		},
		{
			text: 'News',
			path: '/news',
			id: 3,
		},
		{
			text: 'Music',
			path: '/music',
			id: 4,
		},
		{
			text: 'Settings',
			path: '/settings',
			id: 5,
		},
	]
}

const sidebarReducer = (state = initialState, action) => {
	const stateCopy = {...state};
	stateCopy.linksData = [...state.linksData];

	return stateCopy;
}

export default sidebarReducer;