import Screen from '@/components/Screen';
import { Text } from '@/components/Themed';
import { useCompetitionStore } from '@/stores/competitionStore';
import { DraftScore } from '@/types/types';
import React, { useState } from 'react';
import CourtCardList from './CourtCardList';
import RoundButtonList from './RoundButtonList';

const CompetitionManagementScreen = () => {
	const competition = useCompetitionStore((s) => s.selectedCompetition);
	const updateMatchScores = useCompetitionStore((s) => s.updateMatchScores);
	const [selectedRoundIndex, setSelectedRoundIndex] = useState(0);

	if (!competition) {
		return <Text>Ingen turnering vald.</Text>;
	}

	const handleRoundSelect = (roundIndex: number) => {
		setSelectedRoundIndex(roundIndex);
	};

	const handleRoundScoresSave = (draftScores: Record<string, DraftScore>) => {
		updateMatchScores(competition.id, selectedRoundIndex, draftScores);

		if (selectedRoundIndex < competition.rounds.length - 1) {
			setSelectedRoundIndex((prev) => prev + 1);
		}
	};

	return (
		<Screen type={'SafeAreaView'}>
			<RoundButtonList
				rounds={competition.rounds}
				onRoundSelect={handleRoundSelect}
				selectedRoundIndex={selectedRoundIndex}
			/>
			<CourtCardList
				matches={competition.rounds[selectedRoundIndex]}
				onRoundScoresSave={handleRoundScoresSave}
			/>
		</Screen>
	);
};

export default CompetitionManagementScreen;
