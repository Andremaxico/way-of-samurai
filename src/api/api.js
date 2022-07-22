import axios from 'axios';


const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
});

export const usersAPI = {
	getUsersPage(currentPage, pageSize) {
		return instance.get(`/users?page=${currentPage}&count=${pageSize}`).then(res => res.data);
	}
}