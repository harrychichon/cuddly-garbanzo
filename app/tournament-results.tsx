import { View } from '@/components/Themed';
import { sizes } from '@/design-tokens';
import React from 'react';
import { StyleSheet, useWindowDimensions, Text } from 'react-native';
import Screen from '@/components/Screen';
import TournamentCardList from '@/screens/tournament-results/TournamentCardList';
import { useTournamentStore } from '@/stores/tournamentStore';

const TournamentResults = () => {
	const { width } = useWindowDimensions();
	const activeTournaments = useTournamentStore((s) => s.activeTournaments);
	const completedTournaments = useTournamentStore(
		(s) => s.completedTournaments
	);
	const allTournaments = [...activeTournaments, ...completedTournaments];

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'flex-end',
			gap: 4,
			padding: sizes.base.spacing,
			width: width,
		},
	});
	return (
		<Screen type={'SafeAreaView'}>
			<View style={styles.container}>
				<TournamentCardList tournaments={allTournaments} />
			</View>
		</Screen>
	);
};

export default TournamentResults;
