import { useState } from 'react';
import { Text } from '@/components/Themed';
import CourtCardList from '@/screens/tournament-management/CourtCardList';
import { useTournamentStore } from '@/stores/tournamentStore';
import Screen from '@/components/Screen';
import RoundList from '@/screens/tournament-management/RoundList';

type DraftScore = {
	scoreA: number | null;
	scoreB: number | null;
};

const TournamentManagement = () => {
	const tournament = useTournamentStore((s) => s.selectedTournament);
	const updateMatchScores = useTournamentStore((s) => s.updateMatchScores); // Assuming this exists
	const [selectedRoundIndex, setSelectedRoundIndex] = useState(0);

	if (!tournament) {
		return <Text>Ingen turnering vald.</Text>;
	}

	const handleRoundSelect = (roundIndex: number) => {
		setSelectedRoundIndex(roundIndex);
	};

	const handleRoundScoresSave = (draftScores: Record<string, DraftScore>) => {
		updateMatchScores(tournament.id, selectedRoundIndex, draftScores);

		if (selectedRoundIndex < tournament.rounds.length - 1) {
			setSelectedRoundIndex((prev) => prev + 1);
		}
	};

	return (
		<Screen type={'SafeAreaView'}>
			<RoundList
				rounds={tournament.rounds}
				onRoundSelect={handleRoundSelect}
				selectedRoundIndex={selectedRoundIndex}
			/>
			<CourtCardList
				matches={tournament.rounds[selectedRoundIndex]}
				onRoundScoresSave={handleRoundScoresSave}
			/>
		</Screen>
	);
};

export default TournamentManagement;
