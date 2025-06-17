import { Text, View } from '@/components/Themed';
import { useTournamentStore } from '@/stores/tournamentStore';

const TournamentManagement = () => {
	const tournament = useTournamentStore((s) => s.selectedTournament);

	if (!tournament) {
		return <Text>Ingen turnering vald.</Text>;
	}

	return (
		<View>
			<Text>{tournament.name}</Text>
			{/* Render match list, rounds, scoring etc */}
		</View>
	);
};

export default TournamentManagement;
