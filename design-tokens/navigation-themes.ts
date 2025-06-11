import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import colors from './colors';

export const lightNavigationTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: colors.light.primary,
		background: colors.light.background,
		card: colors.light.background,
		text: colors.light.text,
		border: '#E5E5E7',
		notification: colors.light.error,
	},
};

export const darkNavigationTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		primary: colors.dark.primary,
		background: colors.dark.background,
		card: colors.dark.background,
		text: colors.dark.text,
		border: '#2C2C2E',
		notification: colors.dark.error,
	},
};
