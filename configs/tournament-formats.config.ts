import { ImageSourcePropType } from 'react-native';

export type TournamentFormat = {
	name: string;
	available: boolean;
	image: ImageSourcePropType;
	summary: string;
	courtCount?: number;
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

export const calculateMaxCourts = (participantCount: number): number => {
	return Math.floor(participantCount / 2);
};

export const getAvailableFormats = () =>
	Object.entries(TOURNAMENT_FORMATS)
		.filter(([_, format]) => format.available)
		.map(([key, format]) => ({ formatId: key, ...format }));

export const getTournamentFormat = (id: string): TournamentFormat | null => {
	const format = TOURNAMENT_FORMATS[id];

	if (!format || !format.available) {
		return null;
	}

	return format;
};

export const MATCH_FORMATS = {
	BEST_OF_ONE: { sets: 1, gamesPerSet: 6, tiebreakAt: 6 },
	BEST_OF_THREE: { sets: 3, gamesPerSet: 6, tiebreakAt: 6 },
	SHORT_SET: { sets: 1, gamesPerSet: 4, tiebreakAt: 4 },
};

export const SCORING = {
	min: 4,
	max: 32,
};

export const TOURNAMENT_FORMATS: Record<string, TournamentFormat> = {
	AMERICANO_SINGLES: {
		name: 'Americano Singles',
		available: false,
		image: require('@/assets/images/singles.jpg'),
		summary:
			'Americano är en spelform där alla spelar med alla. Passar för en social och jämn turnering.',
		type: 'singles',
		playerRange: { min: 4, max: 64, step: 4 },
	},
	AMERICANO_DOUBLES: {
		name: 'Americano Doubles',
		available: true,
		image: require('@/assets/images/doubles.jpg'),
		summary:
			'Lag Americano är en variant där deltagarna spelar i lag och tävlar mot andra lag.',
		type: 'doubles',
		teamRange: { min: 2, max: 32, step: 2 },
	},
	MEXICANO_SINGLES: {
		name: 'Mexicano Singles',
		available: false,
		image: require('@/assets/images/singles.jpg'),
		summary:
			'Mexicano är en spelform där spelare möter likvärdigt motstånd baserat på tidigare resultat.',
		type: 'singles',
		playerRange: { min: 4, max: 64, step: 4 },
	},
	MEXICANO_DOUBLES: {
		name: 'Mexicano Doubles',
		available: true,
		image: require('@/assets/images/doubles.jpg'),
		summary:
			'Lag Mexicano kombinerar lagspel med Mexicano-systemet där lagen möter likvärdigt motstånd.',
		type: 'doubles',
		teamRange: { min: 2, max: 32, step: 2 },
	},
	BEAT_THE_BOX: {
		name: 'Beat The Box',
		available: false,
		image: require('@/assets/images/singles.jpg'),
		summary:
			'Beat the box är en individuell spelform där spelarna tävlar om att samla mest poäng.',
		type: 'singles',
		playerRange: { min: 4, max: 20, step: 4 },
	},
};
