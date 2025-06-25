export const isSelected = <T extends { id: string }>(
	selected: T | string | null,
	current: T | string
): boolean => {
	const selectedId = typeof selected === 'string' ? selected : selected?.id;
	const currentId = typeof current === 'string' ? current : current?.id;
	return selectedId === currentId;
};
