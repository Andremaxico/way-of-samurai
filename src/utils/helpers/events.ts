export const scrollElementToBottom = (element: HTMLDivElement | null, heightToScroll?: number) => {
	if(element) {
		element.scrollTo({
			top: heightToScroll || element.scrollHeight,
			behavior: 'smooth',
		});
	}
}