import { View } from '@/components/Themed';
import { sizes } from '@/design-tokens';
import { CreateTournamentWizard } from '@/screens/tournament-setup';
import { useRouter } from 'expo-router';

import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TournamentSetup() {
	const router = useRouter();

	const handlePress = () => {
		router.push({
			pathname: '/tournament-management',
		});
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<CreateTournamentWizard />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: 4,
		padding: sizes.base.spacing,
	},
});
