import { View } from '@/components/Themed';
import { FormatCardList } from '@/screens/tournament-setup/';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
	const router = useRouter();

	const handlePress = (formatType: string) => {
		router.push({
			pathname: '/create-tournament',
			params: { formatType },
		});
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<FormatCardList onPress={handlePress} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 4,
	},
});
