
const changeArrayObjProps = (
	items, propValue, newProps, itemProp,
) => {
	console.log('change array obj props params:', items, propValue, newProps, itemProp);
	return items.map((item) => {
		console.log('item[itemProp] = ', item[itemProp]);
		if (item[itemProp] === propValue) {
			return {
				...item,
				...newProps,
			}
		}
		return item; 
	})
}

export default changeArrayObjProps;