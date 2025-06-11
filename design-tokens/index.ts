export { default as colors } from './colors';
export * from './navigation-themes';
export { default as shadows } from './shadows';
export { default as sizes } from './sizes';
export { default as typography } from './typography';

import { default as colors } from './colors';
import { darkNavigationTheme, lightNavigationTheme } from './navigation-themes';
import { default as shadows } from './shadows';
import { default as sizes } from './sizes';
import { default as typography } from './typography';

export const theme = {
	color: colors,
	shadow: shadows,
	size: sizes,
	typography: typography,
	navigation: { light: lightNavigationTheme, dark: darkNavigationTheme },
};
