const systemFont =
	'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const displayFont =
	'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const monoFont =
	'SF Mono, Monaco, Inconsolata, "Roboto Mono", "Courier New", monospace';

export default {
	base: {
		fontFamily: systemFont,
		fontSize: 16,
		fontWeight: '400' as const,
		lineHeight: 1.5,
		letterSpacing: 0,
	},
	fontFamily: {
		body: systemFont,
		heading: displayFont,
		display: displayFont,
		code: monoFont,
		ui: systemFont,
	},
	fontSize: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18,
		xl: 22,
		xxl: 28,
		xxxl: 36,
		display: 48,
	},
	fontWeight: {
		light: '300' as const,
		regular: '400' as const,
		medium: '500' as const,
		semibold: '600' as const,
		bold: '700' as const,
		extrabold: '800' as const,
	},
	lineHeight: {
		tight: 1.2,
		snug: 1.3,
		normal: 1.5,
		relaxed: 1.7,
		loose: 2.0,
	},
	letterSpacing: {
		tight: -0.02,
		normal: 0,
		wide: 0.02,
		wider: 0.04,
	},
};
