import { GetCaptchaResponseType, instance } from "./api";

export const securityAPI = {
	async getCaptchaUrl() {
		const res = await instance.get<GetCaptchaResponseType>('/security/get-captcha-url')
		return res.data;
	}
}