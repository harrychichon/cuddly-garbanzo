import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';

export default function NotFoundScreen() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<View style={styles.container}>
				<Text style={styles.title}>Den här skärmen finns inte.</Text>

				<Link
					href='/'
					style={styles.link}>
					<Text style={styles.linkText}>Go till startsidan</Text>
				</Link>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
});
