import { darkNavigationTheme, lightNavigationTheme } from '@/design-tokens';
import { useAppTheme } from '@/hooks';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabLayout() {
	const { isDark } = useAppTheme();

	return (
		<ThemeProvider value={isDark ? darkNavigationTheme : lightNavigationTheme}>
			<SafeAreaProvider>
				<Tabs screenOptions={{ tabBarActiveTintColor: 'green' }}>
					<Tabs.Screen
						name='index'
						options={{ headerShown: false }}
					/>
					<Tabs.Screen
						name='competition-setup'
						options={{
							title: 'Create',
							tabBarIcon: ({ color }) => (
								<FontAwesome
									size={28}
									name='plus'
									color={color}
								/>
							),
						}}
					/>
					<Tabs.Screen
						name='competition-management'
						options={{
							headerShown: false,
							title: 'Manage',
							tabBarIcon: ({ color }) => (
								<FontAwesome
									size={28}
									name='edit'
									color={color}
								/>
							),
						}}
					/>
					<Tabs.Screen
						name='competition-results'
						options={{
							headerShown: false,
							title: 'Results',
							tabBarIcon: ({ color }) => (
								<FontAwesome
									size={28}
									name='table'
									color={color}
								/>
							),
						}}
					/>
				</Tabs>
			</SafeAreaProvider>
		</ThemeProvider>
	);
}
