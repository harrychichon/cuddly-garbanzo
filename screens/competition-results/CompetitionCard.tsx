import Card from '@/components/Card';
import { Text } from '@/components/Themed';

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
