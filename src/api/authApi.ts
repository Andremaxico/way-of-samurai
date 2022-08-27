import { LoginDataType } from "../types/types";
import { instance, GetAuthInfoResponseDataType, LoginResponseDataType, LogoutResponseDataType } from "./api";

export const authAPI = {
	async getAuthInfo() {
		return instance.get<GetAuthInfoResponseDataType>('/auth/me').then(res => res.data);
	},

	async login(data: LoginDataType) {
		return instance.post<LoginResponseDataType>(`/auth/login`, {...data}).then(res => res.data);
	},

	async logout() {
		return instance.delete<LogoutResponseDataType>('/auth/login').then(res => res.data);
	}
}