export const changeArrayObjProps = (items, propName, newProps, itemProp = 'id',) => {
	return items.map(item => {
		if (item[itemProp] === propName) {
			return {
				...item,
				...newProps,
			}
		}
		return item;
	})
}