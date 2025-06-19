import 'react-native-get-random-values';
import { TournamentFormData } from '@/screens/tournament-setup';
import { Tournament } from '@/types/types';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { generateRoundRobinMatches } from '@/utils/generateRoundRobinMatches';

type DraftScore = {
	scoreA: number | null;
	scoreB: number | null;
};

type TournamentState = {
	activeTournaments: Tournament[];
	completedTournaments: Tournament[];
	selectedTournament: Tournament | null;
	createTournament: (formData: TournamentFormData) => void;
	selectTournament: (id: string) => void;
	completeTournament: (id: string) => void;
	updateMatchScores: (
		tournamentId: string,
		roundIndex: number,
		draftScores: Record<string, DraftScore>
	) => void;
	reset: () => void;
};

export const useTournamentStore = create<TournamentState>((set, get) => ({
	activeTournaments: [],
	completedTournaments: [],
	selectedTournament: null,

	createTournament: (formData) => {
		const id = nanoid();
		const courtNames =
			formData.courtNames ??
			Array.from({ length: formData.courtCount }, (_, i) => `Bana ${i + 1}`);
		const nameList =
			'playerCount' in formData
				? formData.playerNames ??
				  Array.from(
						{ length: formData.playerCount },
						(_, i) => `Spelare ${i + 1}`
				  )
				: formData.teamNames ??
				  Array.from({ length: formData.teamCount }, (_, i) => `Lag ${i + 1}`);
		const rounds = generateRoundRobinMatches(nameList, courtNames);
		const tournament: Tournament = {
			id,
			name: formData.name,
			format: formData.formatType,
			createdAt: new Date().toISOString(),
			status: 'active',
			rounds,
			settings: formData,
		};
		set((state) => ({
			activeTournaments: [...state.activeTournaments, tournament],
			selectedTournament: tournament,
		}));
	},

	selectTournament: (id) => {
		const tournament =
			get().activeTournaments.find((t) => t.id === id) ||
			get().completedTournaments.find((t) => t.id === id) ||
			null;
		set({ selectedTournament: tournament });
	},

	completeTournament: (id) => {
		const { activeTournaments, completedTournaments } = get();
		const tournament = activeTournaments.find((t) => t.id === id);
		if (!tournament) return;
		set({
			activeTournaments: activeTournaments.filter((t) => t.id !== id),
			completedTournaments: [
				...completedTournaments,
				{ ...tournament, status: 'completed' },
			],
			selectedTournament: null,
		});
	},

	updateMatchScores: (tournamentId, roundIndex, draftScores) => {
		set((state) => {
			// Find the tournament in active tournaments
			const tournamentIndex = state.activeTournaments.findIndex(
				(t) => t.id === tournamentId
			);
			if (tournamentIndex === -1) return state; // Tournament not found

			const tournament = state.activeTournaments[tournamentIndex];

			// Check if round exists
			if (!tournament.rounds[roundIndex]) return state;

			// Update the matches in the specified round
			const updatedRounds = [...tournament.rounds];
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

			// Create updated tournament
			const updatedTournament = {
				...tournament,
				rounds: updatedRounds,
			};

			// Update the tournaments array
			const updatedActiveTournaments = [...state.activeTournaments];
			updatedActiveTournaments[tournamentIndex] = updatedTournament;

			return {
				...state,
				activeTournaments: updatedActiveTournaments,
				// Update selectedTournament if it's the same tournament
				selectedTournament:
					state.selectedTournament?.id === tournamentId
						? updatedTournament
						: state.selectedTournament,
			};
		});
	},

	reset: () =>
		set({
			activeTournaments: [],
			completedTournaments: [],
			selectedTournament: null,
		}),
}));
