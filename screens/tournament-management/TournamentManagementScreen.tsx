import Screen from '@/components/Screen';
import { Text } from '@/components/Themed';
import CourtCardList from '@/screens/tournament-management/CourtCardList';
import RoundButtonList from '@/screens/tournament-management/RoundButtonList';
import { useTournamentStore } from '@/stores/tournamentStore';
import { DraftScore } from '@/types/types';
import React, { useState } from 'react';

const TournamentManagementScreen = () => {
	const tournament = useTournamentStore((s) => s.selectedTournament);
	const updateMatchScores = useTournamentStore((s) => s.updateMatchScores);
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
			<RoundButtonList
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

export default TournamentManagementScreen;
