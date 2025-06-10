const mainFont = 'Consolas, Monaco, "Courier New", monospace';
const accentFont = 'Georgia, "Times New Roman", serif';

export default {
	base: {
		fontFamily: mainFont,
		fontSize: 16,
		fontWeight: '400',
		lineHeight: 1.5,
	},
	fontFamily: {
		body: mainFont,
		heading: accentFont,
		code: mainFont,
		ui: mainFont,
	},
	fontSize: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 20,
		xl: 24,
		xxl: 32,
	},
	fontWeight: {
		light: '300',
		regular: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
	},
	lineHeight: {
		tight: 1.2,
		normal: 1.5,
		relaxed: 1.8,
	},
};
