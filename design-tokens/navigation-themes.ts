// import { DarkTheme, DefaultTheme } from '@react-navigation/native';
// import colors from './colors';
// import shadows from './shadows';
// import sizes from './sizes';
// import typography from './typography';

// const otherVariables = {
// 	shadows: { ...shadows },
// 	sizes: { ...sizes },
// 	typography: { ...typography },
// };

// //TODO Hur gör jag för att färger ska hämtas dynamiskt från colors.ts?
// export const lightNavigationTheme = {
// 	...DefaultTheme,
// 	colors: {
// 		...DefaultTheme.colors,
// 		...colors.light,
// 	},
// 	...otherVariables,
// };

// export const darkNavigationTheme = {
// 	...DarkTheme,
// 	colors: {
// 		...DarkTheme.colors,
// 		...colors.dark,
// 	},
// 	...otherVariables,
// };

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

export const lightNavigationTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		...colors.light,
		primary: colors.light.primary,
		background: colors.light.background,
		card: colors.light.surface,
		text: colors.light.text,
		border: colors.light.border,
		notification: colors.light.primary,
	},
	...otherVariables,
};

export const darkNavigationTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		...colors.dark,
		primary: colors.dark.primary,
		background: colors.dark.background,
		card: colors.dark.surface,
		text: colors.dark.text,
		border: colors.dark.border,
		notification: colors.dark.primary,
	},
	...otherVariables,
};
