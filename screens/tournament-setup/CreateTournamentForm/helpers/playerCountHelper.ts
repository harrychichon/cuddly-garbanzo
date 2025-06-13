const playerCountHelper = (range: {
	min: number;
	max: number;
	step: number;
}): number[] => {
	const counts = [];
	for (let i = range.min; i <= range.max; i += range.step) {
		counts.push(i);
	}
	return counts;
};

export default playerCountHelper;
