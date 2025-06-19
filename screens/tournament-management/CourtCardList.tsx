import { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Match } from '@/types/types';
import CourtCard from './CourtCard';
import Button from '@/components/Button';

type DraftScore = {
	scoreA: number | null;
	scoreB: number | null;
};

type CourtCardListProps = {
	matches: Match[];
	onRoundScoresSave: (draftScores: Record<string, DraftScore>) => void;
};

const CourtCardList = ({ matches, onRoundScoresSave }: CourtCardListProps) => {
	const [draftScores, setDraftScores] = useState<Record<string, DraftScore>>(
		{}
	);

	const handleCourtScoreSave = (
		matchId: string,
		scoreA: number | null,
		scoreB: number | null
	) => {
		setDraftScores((prev) => ({
			...prev,
			[matchId]: { scoreA, scoreB },
		}));
	};

	const handleSaveAllScores = () => {
		onRoundScoresSave(draftScores);
		setDraftScores({}); // Clear drafts after saving
	};

	const hasUnsavedScores = Object.keys(draftScores).length > 0;

	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}>
			{matches.map((match) => (
				<CourtCard
					key={match.id}
					match={match}
					onScoreSave={handleCourtScoreSave}
					hasUnsavedScore={!!draftScores[match.id]}
					draftScore={draftScores[match.id]}
				/>
			))}

			<Button
				variant={'positive'}
				title={`Save Round Scores (${Object.keys(draftScores).length})`}
				onPress={handleSaveAllScores}
				disabled={!hasUnsavedScores}
			/>
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

export default CourtCardList;
