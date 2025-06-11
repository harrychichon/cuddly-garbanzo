import { ImageSourcePropType } from 'react-native';

export type TournamentFormat = {
	name: string;
	image: ImageSourcePropType;
	summary: string;
} & (
	| {
			type: 'singles';
			playerRange: { min: number; max: number; step: number };
	  }
	| {
			type: 'doubles';
			teamRange: { min: number; max: number; step: number };
	  }
);

export const MATCH_FORMATS = {
	BEST_OF_ONE: { sets: 1, gamesPerSet: 6, tiebreakAt: 6 },
	BEST_OF_THREE: { sets: 3, gamesPerSet: 6, tiebreakAt: 6 },
	SHORT_SET: { sets: 1, gamesPerSet: 4, tiebreakAt: 4 },
	SUPER_TIEBREAK: { sets: 1, pointsToWin: 10, winByTwo: true },
};

export const SCORING_SYSTEMS = {
	TRADITIONAL: 'traditional', // 15-30-40
	NUMERIC: 'numeric', // 1-2-3-4
	NO_DEUCE: 'no_deuce', // First to 4 points wins
};

export const TOURNAMENT_FORMATS: Record<string, TournamentFormat> = {
	AMERICANO_SINGLES: {
		name: 'Americano Singles',
		image: require('@/assets/images/singles.jpg'),
		summary:
			'Americano är en spelform där alla spelar med alla. Passar för en social och jämn turnering.',
		type: 'singles',
		playerRange: { min: 4, max: 64, step: 4 },
	},
	AMERICANO_DOUBLES: {
		name: 'Americano Doubles',
		image: require('@/assets/images/doubles.jpg'),
		summary:
			'Lag Americano är en variant där deltagarna spelar i lag och tävlar mot andra lag.',
		type: 'doubles',
		teamRange: { min: 2, max: 32, step: 2 },
	},
	MEXICANO_SINGLES: {
		name: 'Mexicano Singles',
		image: require('@/assets/images/singles.jpg'),
		summary:
			'Mexicano är en spelform där spelare möter likvärdigt motstånd baserat på tidigare resultat.',
		type: 'singles',
		playerRange: { min: 4, max: 64, step: 4 },
	},
	MEXICANO_DOUBLES: {
		name: 'Mexicano Doubles',
		image: require('@/assets/images/doubles.jpg'),
		summary:
			'Lag Mexicano kombinerar lagspel med Mexicano-systemet där lagen möter likvärdigt motstånd.',
		type: 'doubles',
		teamRange: { min: 2, max: 32, step: 2 },
	},
	BEAT_THE_BOX: {
		name: 'Beat The Box',
		image: require('@/assets/images/singles.jpg'),
		summary:
			'Beat the box är en individuell spelform där spelarna tävlar om att samla mest poäng.',
		type: 'singles',
		playerRange: { min: 4, max: 20, step: 4 },
	},
};
