import { Match } from '@/types/';
import { nanoid } from 'nanoid';
import 'react-native-get-random-values';

const shuffle = <T>(array: T[]): T[] => {
	const copy = [...array];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
};

export function generateRoundRobinMatches(
	playersOrTeams: string[],
	courts: string[]
): Match[][] {
	const rounds: Match[][] = [];
	const totalPlayers = playersOrTeams.length;
	const even = totalPlayers % 2 === 0;
	const players = [...playersOrTeams];

	if (!even) players.push('BYE');

	const numRounds = players.length - 1;
	const numMatchesPerRound = players.length / 2;

	for (let round = 0; round < numRounds; round++) {
		const roundMatches: Match[] = [];
		const matchPairs = [];

		for (let match = 0; match < numMatchesPerRound; match++) {
			const home = players[match];
			const away = players[players.length - 1 - match];
			if (home === 'BYE' || away === 'BYE') continue;
			matchPairs.push({ home, away });
		}

		const shuffledMatches = shuffle(matchPairs);

		shuffledMatches.forEach(({ home, away }, i) => {
			roundMatches.push({
				id: nanoid(),
				court: courts[i % courts.length],
				sideA: [home],
				sideB: [away],
				round: round + 1,
				scoreA: null,
				scoreB: null,
			});
		});

		// Rotera spelare (förutom den första)
		players.splice(1, 0, players.pop()!);
		rounds.push(roundMatches);
	}

	return rounds;
}
