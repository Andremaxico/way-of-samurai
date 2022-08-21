
export const changeObjOfArrayProps = (
	items: Array<object>, propName: string | number, newProps: object, itemProp: string = 'id',
) => {
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