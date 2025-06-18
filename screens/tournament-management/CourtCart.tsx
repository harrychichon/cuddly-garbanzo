import { Match } from '@/types/types';
import { View, Text } from '@/components/Themed';

type CourtCardProps = {
	match: Match;
};

const CourtCart = ({ match }: Readonly<CourtCardProps>) => {
	return (
		<View>
			<Text>{match.court}</Text>
			<View>
				<Text>{match.sideA}</Text>
				<Text>
					{match.scoreA} - {match.scoreB}
				</Text>
				<Text>{match.sideB}</Text>
			</View>
		</View>
	);
};

export default CourtCart;
