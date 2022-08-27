
const changeArrayObjProps = (
	items, propName, newProps, itemProp,
) => {
	return items.map((item) => {
		if (item[itemProp] === propName) {
			return {
				...item,
				...newProps,
			}
		}
		return item; 
	})
}

export default changeArrayObjProps;