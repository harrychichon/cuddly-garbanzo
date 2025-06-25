import { Card, Text } from '@/components/';
import { Competition } from '@/types';

type CompetitionCardProps = {
	competition: Competition;
};

const CompetitionCard = ({ competition }: Readonly<CompetitionCardProps>) => {
	return (
		<Card>
			<Text>{competition.name}</Text>
			<Text>{competition.status}</Text>
		</Card>
	);
};

export default CompetitionCard;
