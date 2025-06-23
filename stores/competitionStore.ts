import { CompetitionFormData } from '@/screens/competition-setup';
import { Competition } from '@/types/types';
import { generateRoundRobinMatches } from '@/utils/generateRoundRobinMatches';
import { nanoid } from 'nanoid';
import 'react-native-get-random-values';
import { create } from 'zustand';

type DraftScore = {
	scoreA: number | null;
	scoreB: number | null;
};

type CompetitionState = {
	activeCompetitions: Competition[];
	completedCompetitions: Competition[];
	selectedCompetition: Competition | null;
	createCompetition: (formData: CompetitionFormData) => void;
	selectCompetition: (id: string) => void;
	completeCompetition: (id: string) => void;
	updateMatchScores: (
		competitionId: string,
		roundIndex: number,
		draftScores: Record<string, DraftScore>
	) => void;
	reset: () => void;
};

export const useCompetitionStore = create<CompetitionState>((set, get) => ({
	activeCompetitions: [],
	completedCompetitions: [],
	selectedCompetition: null,

	createCompetition: (formData) => {
		const id = nanoid();
		const courtNames =
			formData.courtNames ??
			Array.from({ length: formData.courtCount }, (_, i) => `Bana ${i + 1}`);

		const participants =
			'playerCount' in formData
				? formData.playerNames ??
				  Array.from(
						{ length: formData.playerCount },
						(_, i) => `Spelare ${i + 1}`
				  )
				: formData.teamNames ??
				  Array.from({ length: formData.teamCount }, (_, i) => `Lag ${i + 1}`);

		const rounds = generateRoundRobinMatches(participants, courtNames);

		const competition: Competition = {
			id,
			name: formData.name,
			format: formData.formatType,
			matchFormat: formData.matchFormat,
			scoringSystem: formData.scoringSystem,
			courtCount: formData.courtCount,
			courtNames,
			participants,
			startDate: formData.startDate,
			createdAt: new Date().toISOString(),
			status: 'active',
			rounds,
		};
		set((state) => ({
			activeCompetitions: [...state.activeCompetitions, competition],
			selectedCompetition: competition,
		}));
	},

	selectCompetition: (id) => {
		const competition =
			get().activeCompetitions.find((t) => t.id === id) ||
			get().completedCompetitions.find((t) => t.id === id) ||
			null;
		set({ selectedCompetition: competition });
	},

	completeCompetition: (id) => {
		const { activeCompetitions, completedCompetitions } = get();
		const competition = activeCompetitions.find((t) => t.id === id);
		if (!competition) return;
		set({
			activeCompetitions: activeCompetitions.filter((t) => t.id !== id),
			completedCompetitions: [
				...completedCompetitions,
				{ ...competition, status: 'completed' },
			],
			selectedCompetition: null,
		});
	},

	updateMatchScores: (competitionId, roundIndex, draftScores) => {
		set((state) => {
			// Find the Competition in active Competitions
			const competitionIndex = state.activeCompetitions.findIndex(
				(c) => c.id === competitionId
			);
			if (competitionIndex === -1) return state; // Competition not found

			const competition = state.activeCompetitions[competitionIndex];

			// Check if round exists
			if (!competition.rounds[roundIndex]) return state;

			// Update the matches in the specified round
			const updatedRounds = [...competition.rounds];
			updatedRounds[roundIndex] = updatedRounds[roundIndex].map((match) => {
				const draftScore = draftScores[match.id];
				if (draftScore) {
					return {
						...match,
						scoreA: draftScore.scoreA,
						scoreB: draftScore.scoreB,
					};
				}
				return match;
			});

			// Create updated competition
			const updatedCompetition = {
				...competition,
				rounds: updatedRounds,
			};

			// Update the competitions array
			const updatedActiveCompetitions = [...state.activeCompetitions];
			updatedActiveCompetitions[competitionIndex] = updatedCompetition;

			return {
				...state,
				activeCompetitions: updatedActiveCompetitions,
				// Update selectedCompetition if it's the same Competition
				selectedCompetition:
					state.selectedCompetition?.id === competitionId
						? updatedCompetition
						: state.selectedCompetition,
			};
		});
	},

	reset: () =>
		set({
			activeCompetitions: [],
			completedCompetitions: [],
			selectedCompetition: null,
		}),
}));
