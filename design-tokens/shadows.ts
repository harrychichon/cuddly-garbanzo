const shadowColor = '#000000';
const lightShadowColor = 'rgba(30, 58, 95, 0.3)'; // Dark blue shadow for light theme

export default {
	subtle: {
		shadowColor: shadowColor,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 2,
	},
	moderate: {
		shadowColor: shadowColor,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 6,
		elevation: 4,
	},
	pronounced: {
		shadowColor: shadowColor,
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 8,
	},
	card: {
		shadowColor: lightShadowColor,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 4,
		elevation: 3,
	},
};
