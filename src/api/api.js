import axios from "axios";
import { followAC } from "../Redux/users-reducer";

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
	}
}

console.log(usersAPI);