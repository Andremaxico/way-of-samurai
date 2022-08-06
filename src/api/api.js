import axios from "axios";
import { setAvatar } from "../Redux/profile-reducer";

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	withCredentials: true,
	headers: {
		"API-KEY": "df1aa1db-d489-4abc-9e0f-8cdb985073d7", 
	},
});

export const usersAPI = {
	async getUsersPage(pageNum, pagesSize)  {
		return instance.get(`/users?page=${pageNum}&count=${pagesSize}`).then(res => {
			return res.data;
		});
	},
	async follow(userId) {
		return instance.post(`/follow/${userId}`).then(res => res.data);
	},
	async unfollow(userId) {
		return instance.delete(`/follow/${userId}`).then(res => res.data);
	},
	async getUserById(userId) {
		return instance.get(`/profile/${userId}`).then(res => res.data);
	},
}

export const authAPI = {
	async getAuthInfo() {
		return instance.get('/auth/me').then(res => res.data);
	},

	async login(data) {
		return instance.post(`/auth/login`, {...data}).then(res => res.data);
	},

	async logout() {
		return instance.delete('/auth/login').then(res => res.data);
	}
}	

export const profileAPI = {
	async updateMyStatus(status) {
		return instance.put('/profile/status', {status}).then(res => res.data).catch(e => console.log(e));
	},

	async getUserStatus(userId) {
		return instance.get(`/profile/status/${userId}`).then(res => res.data).catch(e => e.message);
	},

	async setAvatar(file) {
		const formData = new FormData();
		formData.append('image', file);

		return instance.put('/profile/photo', formData, {
			headers: {
				'Content-type':'multiport/form-data',
			}
		}).then(res => res.data);
	} 
}