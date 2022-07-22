import axios from 'axios';


const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	headers: {
		"API-KEY": 'df1aa1db-d489-4abc-9e0f-8cdb985073d7',
	},
	withCredentials: true,
});

export const usersAPI = {
	async getUsersPage(currentPage, pageSize) {
		return instance.get(`/users?page=${currentPage}&count=${pageSize}`).then(res => res.data);
	},

	async follow(userId) {
		return instance.post(`/follow/${userId}`).then(res => res.data);
	},
	async unfollow(userId) {
		return instance.delete(`/follow/${userId}`).then(res => res.data);
	},

	async getUserById(userId) {
		return instance.get(`/profile/${userId}`).then(res => res.data);
	}
}

export const authAPI = {
	async getAuthData() {
		return instance.get('/auth/me').then(res => res.data);
	}
}