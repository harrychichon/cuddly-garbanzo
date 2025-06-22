import Screen from '@/components/Screen';
import { View } from '@/components/Themed';
import { sizes } from '@/design-tokens';
import TournamentCardList from '@/screens/tournament-results/TournamentCardList';
import React from 'react';
import { StyleSheet } from 'react-native';

const TournamentResultsScreen = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'flex-end',
			gap: 4,
			padding: sizes.base.spacing,
			width: '100%',
		},
	});
	return (
		<Screen type={'SafeAreaView'}>
			<View style={styles.container}>
				<TournamentCardList />
			</View>
		</Screen>
	);
};

export default TournamentResultsScreen;
