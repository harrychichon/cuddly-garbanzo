import { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';
import { Match } from '@/types/types';

type DraftScore = {
	scoreA: number | null;
	scoreB: number | null;
};

type CourtCardProps = {
	match: Match;
	onScoreSave: (
		matchId: string,
		scoreA: number | null,
		scoreB: number | null
	) => void;
	hasUnsavedScore: boolean;
	draftScore?: DraftScore;
};

const CourtCard = ({
	match,
	onScoreSave,
	hasUnsavedScore,
	draftScore,
}: CourtCardProps) => {
	// Använd preliminärt resultat om tillgängligt, annars använd matchresultat.
	const [scoreA, setScoreA] = useState<string>(
		draftScore?.scoreA?.toString() ?? match.scoreA?.toString() ?? ''
	);
	const [scoreB, setScoreB] = useState<string>(
		draftScore?.scoreB?.toString() ?? match.scoreB?.toString() ?? ''
	);

	// Uppdatera lokal state när det preliminära resultatet ändras (t.ex. efter att det sparats).
	useEffect(() => {
		if (draftScore) {
			setScoreA(draftScore.scoreA?.toString() ?? '');
			setScoreB(draftScore.scoreB?.toString() ?? '');
		}
	}, [draftScore]);

	const handleSave = () => {
		const parsedScoreA = scoreA ? parseInt(scoreA) : null;
		const parsedScoreB = scoreB ? parseInt(scoreB) : null;
		onScoreSave(match.id, parsedScoreA, parsedScoreB);
	};

	const canSave = scoreA !== '' && scoreB !== '';

	return (
		<View style={[styles.card, hasUnsavedScore && styles.unsavedCard]}>
			<Text style={styles.courtTitle}>{match.court}</Text>

			<View style={styles.matchup}>
				<View style={styles.side}>
					<Text style={styles.sideLabel}>
						{Array.isArray(match.sideA) ? match.sideA.join(' & ') : match.sideA}
					</Text>
					<TextInput
						style={styles.scoreInput}
						value={scoreA}
						onChangeText={setScoreA}
						keyboardType='numeric'
						placeholder='0'
					/>
				</View>

				<Text style={styles.vs}>VS</Text>

				<View style={styles.side}>
					<Text style={styles.sideLabel}>
						{Array.isArray(match.sideB) ? match.sideB.join(' & ') : match.sideB}
					</Text>
					<TextInput
						style={styles.scoreInput}
						value={scoreB}
						onChangeText={setScoreB}
						keyboardType='numeric'
						placeholder='0'
					/>
				</View>
			</View>

			<TouchableOpacity
				style={[
					styles.saveButton,
					!canSave && styles.disabledButton,
					hasUnsavedScore && styles.unsavedButton,
				]}
				onPress={handleSave}
				disabled={!canSave}>
				<Text
					style={[
						styles.saveButtonText,
						hasUnsavedScore && styles.unsavedButtonText,
					]}>
					{hasUnsavedScore ? '✓ Saved' : 'Save Court'}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#f5f5f5',
		borderRadius: 8,
		padding: 16,
		borderWidth: 2,
		borderColor: 'transparent',
	},
	unsavedCard: {
		borderColor: '#007AFF',
		backgroundColor: '#f0f8ff',
	},
	courtTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 16,
	},
	matchup: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	side: {
		flex: 1,
		alignItems: 'center',
	},
	sideLabel: {
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 8,
		textAlign: 'center',
	},
	scoreInput: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 4,
		padding: 8,
		width: 60,
		textAlign: 'center',
		fontSize: 18,
		backgroundColor: 'white',
	},
	vs: {
		fontSize: 16,
		fontWeight: 'bold',
		marginHorizontal: 16,
	},
	saveButton: {
		backgroundColor: '#007AFF',
		padding: 12,
		borderRadius: 6,
		alignItems: 'center',
	},
	disabledButton: {
		backgroundColor: '#ccc',
	},
	unsavedButton: {
		backgroundColor: '#28a745',
	},
	saveButtonText: {
		color: 'white',
		fontWeight: '600',
	},
	unsavedButtonText: {
		color: 'white',
	},
});

export default CourtCard;
