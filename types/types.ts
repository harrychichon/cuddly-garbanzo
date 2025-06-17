import { TournamentFormData } from '@/screens/tournament-setup';

export type Player = {
	name: string;
	id: string;
};

export type Team = {
	members: Player[];
	id: string;
};

export type Match = {
	court: string;
	teamA: string[];
	teamB: string[];
	round: number;
	scoreA: number | null;
	scoreB: number | null;
};

export type Tournament = {
	id: string;
	name: string;
	format: TournamentFormData['formatType'];
	createdAt: string;
	status: 'active' | 'completed';
	rounds: Match[][];
	settings: TournamentFormData;
};
