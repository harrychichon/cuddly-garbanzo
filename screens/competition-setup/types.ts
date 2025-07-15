import { COMPETITION_FORMATS, MATCH_FORMATS, SCORING } from '@/configs';

// The competitions type during creation
export type CompetitionFormData = {
	id: string;
	name: string;
	matchFormat: keyof typeof MATCH_FORMATS;
	scoringSystem?: keyof typeof SCORING;
	formatType: keyof typeof COMPETITION_FORMATS;
	courtCount: number;
	courtNames?: string[];
	startDate: string;
} & (
	| { playerCount: number; playerNames?: string[] }
	| { teamCount: number; teamNames?: string[] }
);

export const isSinglesFormat = (
	data: CompetitionFormData
): data is CompetitionFormData & {
	playerCount: number;
	playerNames?: string[];
} => {
	return 'playerCount' in data;
};

export const isTeamFormat = (
	data: CompetitionFormData
): data is CompetitionFormData & {
	teamCount: number;
	teamNames?: string[];
} => {
	return 'teamCount' in data;
};
