import Card from '@/components/Card';
import { Text } from '@/components/Themed';
import { Tournament } from '@/types/types';

type TournamentCardProps = {
	tournament: Tournament;
};

const TournamentCard = ({ tournament }: Readonly<TournamentCardProps>) => {
	return (
		<Card>
			<Text>{tournament.name}</Text>
			<Text>{tournament.status}</Text>
		</Card>
	);
};

export default TournamentCard;
