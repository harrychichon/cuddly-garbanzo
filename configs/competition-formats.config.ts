import { ImageSourcePropType } from 'react-native';

export type ParticipantRange = {
	min: number;
	max: number;
	step: number;
};

export type CompetitionBase = {
	name: string;
	available: boolean;
	image: ImageSourcePropType;
	summary: string;
	courtCount?: number;
};

export type TournamentFormat = CompetitionBase & {
	competitionType: 'tournament';
	formatType: 'singles' | 'doubles';
	playerRange?: ParticipantRange;
	teamRange?: ParticipantRange;
};

export type LeagueFormat = CompetitionBase & {
	competitionType: 'league';
	formatType: 'singles' | 'doubles';
	playerRange?: ParticipantRange;
	teamRange?: ParticipantRange;
};

export type CompetitionFormat = TournamentFormat | LeagueFormat;

export const calculateMaxCourts = (participantCount: number): number => {
	return Math.floor(participantCount / 2);
};

export const getAvailableFormats = () =>
	Object.entries(COMPETITION_FORMATS)
		.filter(([_, format]) => format.available)
		.map(([key, format]) => ({ formatId: key, ...format }));

export const getCompetitionFormat = (id: string): CompetitionFormat | null => {
	const format = COMPETITION_FORMATS[id];
	if (!format || !format.available) return null;
	return format;
};

export const MATCH_FORMATS = {
	POINTS_BASED: {
		sets: 1,
		gamesPerSet: { min: 4, max: 32 },
		tiebreak: {
			goldenPoint: 'Golden point',
			advantageDeuce: 'Advantage/Deuce',
		},
	},
	SETS_BASED: {
		sets: { min: 2, max: 8 },
		gamesPerSet: { min: 4, max: 8 },
		tiebreak: {
			goldenPoint: 'Golden point',
			advantageDeuce: 'Advantage/Deuce',
		},
	},
};

export const SCORING = {
	min: 4,
	max: 32,
};

export const COMPETITION_FORMATS: Record<string, CompetitionFormat> = {
	AMERICANO_SINGLES: {
		competitionType: 'league',
		name: 'Americano Singles',
		available: false,
		image: require('@/assets/images/singles.jpg'),
		summary:
			'Americano är en spelform där alla spelar med alla. Passar för en social och jämn turnering.',
		formatType: 'singles',
		playerRange: { min: 4, max: 64, step: 4 },
	},
	AMERICANO_DOUBLES: {
		competitionType: 'league',
		name: 'Americano Doubles',
		available: true,
		image: require('@/assets/images/doubles.jpg'),
		summary:
			'Lag Americano är en variant där deltagarna spelar i lag och tävlar mot andra lag.',
		formatType: 'doubles',
		teamRange: { min: 2, max: 32, step: 2 },
	},
	MEXICANO_SINGLES: {
		competitionType: 'league',
		name: 'Mexicano Singles',
		available: false,
		image: require('@/assets/images/singles.jpg'),
		summary:
			'Mexicano är en spelform där spelare möter likvärdigt motstånd baserat på tidigare resultat.',
		formatType: 'singles',
		playerRange: { min: 4, max: 64, step: 4 },
	},
	MEXICANO_DOUBLES: {
		competitionType: 'league',
		name: 'Mexicano Doubles',
		available: true,
		image: require('@/assets/images/doubles.jpg'),
		summary:
			'Lag Mexicano kombinerar lagspel med Mexicano-systemet där lagen möter likvärdigt motstånd.',
		formatType: 'doubles',
		teamRange: { min: 2, max: 32, step: 2 },
	},
	BEAT_THE_BOX: {
		competitionType: 'tournament',
		name: 'Beat The Box',
		available: false,
		image: require('@/assets/images/singles.jpg'),
		summary:
			'Beat the box är en individuell spelform där spelarna tävlar om att samla mest poäng.',
		formatType: 'singles',
		playerRange: { min: 4, max: 20, step: 4 },
	},

	ROUND_ROBIN_LEAGUE_SINGLES: {
		competitionType: 'league',
		name: 'Round Robin League',
		available: false,
		image: require('@/assets/images/singles.jpg'),
		summary:
			'Alla spelare eller lag möter varandra i ett schema som sträcker sig över flera veckor.',
		formatType: 'singles',
		teamRange: { min: 4, max: 16, step: 2 },
	},

	ROUND_ROBIN_LEAGUE_DOUBLES: {
		competitionType: 'league',
		name: 'Round Robin League',
		available: false,
		image: require('@/assets/images/doubles.jpg'),
		summary:
			'Alla spelare eller lag möter varandra i ett schema som sträcker sig över flera veckor.',
		formatType: 'doubles',
		teamRange: { min: 4, max: 16, step: 2 },
	},
};

//TODO Snygga till det här. Behövs väl inte en för singles och en för doubles?
