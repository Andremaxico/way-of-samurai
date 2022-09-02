export const stringToBoolean = (value: string | boolean | undefined) => {
	if(typeof value !== 'string') return value;
	return value === 'true' ? true : value === 'false' ? false : null;
}