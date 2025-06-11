import {
	darkNavigationTheme,
	lightNavigationTheme,
	shadows,
	sizes,
	typography,
} from '@/design-tokens';
import { useColorScheme } from 'react-native';

export const useAppTheme = () => {
	const colorScheme = useColorScheme();

	return {
		isDark: colorScheme === 'dark',
		theme: colorScheme ?? 'light', // Handle null case
		colors: colorScheme === 'dark' ? darkNavigationTheme : lightNavigationTheme,
		shadows: { ...shadows },
		sizes: { ...sizes },
		typography: { ...typography },
	};
};
