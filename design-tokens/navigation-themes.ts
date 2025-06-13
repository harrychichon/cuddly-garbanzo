import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import colors from './colors';
import shadows from './shadows';
import sizes from './sizes';
import typography from './typography';

const otherVariables = {
	shadows: { ...shadows },
	sizes: { ...sizes },
	typography: { ...typography },
};

//TODO Hur gör jag för att färger ska hämtas dynamiskt från colors.ts?
export const lightNavigationTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		...colors.light,
	},
	...otherVariables,
};

export const darkNavigationTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		...colors.dark,
	},
	...otherVariables,
};
