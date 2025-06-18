import 'react-native-get-random-values';
import { TournamentFormData } from '@/screens/tournament-setup';
import { Tournament } from '@/types/types';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { generateRoundRobinMatches } from '@/utils/generateRoundRobinMatches';

type TournamentState = {
	activeTournaments: Tournament[];
	completedTournaments: Tournament[];
	selectedTournament: Tournament | null;

	createTournament: (formData: TournamentFormData) => void;
	selectTournament: (id: string) => void;
	completeTournament: (id: string) => void;
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
			name: formData.tournamentName,
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

	reset: () =>
		set({
			activeTournaments: [],
			completedTournaments: [],
			selectedTournament: null,
		}),
}));
