import { Text, View } from '@/components/Themed';
import { useTournamentStore } from '@/stores/tournamentStore';
import { SafeAreaView, StyleSheet } from 'react-native';

const TournamentManagement = () => {
	const tournament = useTournamentStore((s) => s.selectedTournament);

	if (!tournament) {
		return <Text>Ingen turnering vald.</Text>;
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<Text>{tournament.name}</Text>
				<Text>{tournament.format}</Text>
				<Text>{tournament.createdAt}</Text>
				<Text>{tournament.id}</Text>
				<Text>{tournament.status}</Text>
				<View>
					{tournament.rounds.map((round, roundIdx) =>
						round.map((element, matchIdx) => (
							<>
								<Text key={`${roundIdx}-${matchIdx}`}>{element.court}</Text>
								<Text key={`${roundIdx}-${matchIdx}`}>{element.sideA}</Text>
								<Text key={`${roundIdx}-${matchIdx}`}>{element.scoreA}</Text>
								<Text key={`${roundIdx}-${matchIdx}`}> - </Text>
								<Text key={`${roundIdx}-${matchIdx}`}>{element.scoreB}</Text>
								<Text key={`${roundIdx}-${matchIdx}`}>{element.scoreB}</Text>
							</>
						))
					)}
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 4,
	},
});

export default TournamentManagement;
