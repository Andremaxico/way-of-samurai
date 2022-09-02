export const parseQueryString = (str: string) => {
	let params = {};

	str.slice(1).split('&').map((str: string) => {
		const arr: Array<string> = str.split('=');
		let obj: {[key: string]: string} = {};
		obj[arr[0]] = arr[1];
		return obj;
	}).forEach((obj: {}) => {
		params = {...params, ...obj};
	});

	return params;
}