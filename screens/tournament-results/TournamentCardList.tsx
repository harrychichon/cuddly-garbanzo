import { useTournamentStore } from '@/stores/tournamentStore';
import { ScrollView, StyleSheet } from 'react-native';
import TournamentCard from './TournamentCard';

const TournamentCardList = () => {
	const activeTournaments = useTournamentStore((s) => s.activeTournaments);
	const completedTournaments = useTournamentStore(
		(s) => s.completedTournaments
	);
	const allTournaments = [...activeTournaments, ...completedTournaments];
	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}>
			{allTournaments.map((tournament) => (
				<TournamentCard
					key={tournament.id}
					tournament={tournament}
				/>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		gap: 12,
		width: '100%',
	},
});

export default TournamentCardList;
