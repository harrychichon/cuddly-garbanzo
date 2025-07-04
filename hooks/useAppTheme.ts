import { darkNavigationTheme, lightNavigationTheme } from '@/design-tokens';
import { useColorScheme } from 'react-native';

export const useAppTheme = () => {
	const colorScheme = useColorScheme();

	return {
		isDark: colorScheme === 'dark',
		// theme: colorScheme ?? 'light', // Handle null case
		theme: colorScheme === 'dark' ? darkNavigationTheme : lightNavigationTheme,
	};
};
