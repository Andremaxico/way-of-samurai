type ParamsType = {
	items: any, 
	propName: any, 
	newProps: any, 
	itemProp?: string,
}

export const changeArrayObjProps = (items: any, propName: any, newProps: any, itemProp: string = 'id',) => {
	return items.map((item: any) => {
		if (item[itemProp] === propName) {
			return {
				...item,
				...newProps,
			}
		}
		return item;
	})
}