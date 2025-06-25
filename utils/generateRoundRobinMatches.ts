import { Match } from '@/types/';
import { nanoid } from 'nanoid';
import 'react-native-get-random-values';

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

		for (let match = 0; match < numMatchesPerRound; match++) {
			const home = players[match];
			const away = players[players.length - 1 - match];
			if (home === 'BYE' || away === 'BYE') continue;

			roundMatches.push({
				id: nanoid(),
				court: courts[match % courts.length],
				sideA: [home],
				sideB: [away],
				round: round + 1,
				scoreA: null,
				scoreB: null,
			});
		}

		// Rotera spelare (förutom den första)
		players.splice(1, 0, players.pop()!);
		rounds.push(roundMatches);
	}

	return rounds;
}
