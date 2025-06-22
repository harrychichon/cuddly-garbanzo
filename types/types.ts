import { MATCH_FORMATS, SCORING, TOURNAMENT_FORMATS } from '@/configs';
/* 
export type Player = {
	name: string;
	id: string;
};

export type Team = {
	name: string;
	id: string;
};

export type PairOfPlayers = [Player, Player];

export type Side = PairOfPlayers | Team;

export function isPairOfPlayers(side: Side): side is [Player, Player] {
	return Array.isArray(side) && side.length === 2;
}

export type Court = {
	name: string;
	id: string;
};

export type Match = {
	id: string;
	court: Court;
	sideA: Side;
	sideB: Side;
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
 */

export type Match = {
	id: string;
	court: string;
	sideA: string | string[];
	sideB: string | string[];
	round: number;
	scoreA: number | null;
	scoreB: number | null;
};

// export type Tournament = {
// 	id: string;
// 	name: TournamentFormData['name'];
// 	format: TournamentFormData['formatType'];
// 	createdAt: string;
// 	status: 'active' | 'completed';
// 	rounds: Match[][];
// 	settings: TournamentFormData;
// };

export type Tournament = {
	id: string;
	name: string;
	format: keyof typeof TOURNAMENT_FORMATS;
	matchFormat: keyof typeof MATCH_FORMATS;
	scoringSystem?: keyof typeof SCORING;
	courtCount: number;
	courtNames: string[];
	participants: string[]; // Combined playerNames/teamNames
	startDate: string;
	createdAt: string;
	status: 'active' | 'completed';
	rounds: Match[][];
	winner?: string; // Winner name
	// tournamentTable?: TournamentTableEntry[];
};

export type DraftScore = {
	scoreA: number | null;
	scoreB: number | null;
};
