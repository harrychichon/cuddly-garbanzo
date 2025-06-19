import { ScrollView } from 'react-native';
import { Match } from '@/types/types';
import RoundButton from './RoundButton';

type RoundListProps = {
	rounds: Match[][];
	onRoundSelect: (roundIndex: number) => void;
	selectedRoundIndex: number;
};

const RoundList = ({
	rounds,
	onRoundSelect,
	selectedRoundIndex,
}: Readonly<RoundListProps>) => {
	return (
		<ScrollView
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				flexDirection: 'row',
				paddingHorizontal: 16,
				gap: 8,
			}}>
			{rounds.map((round, index) => (
				<RoundButton
					key={`round-${index}`}
					title={(index + 1).toString()}
					roundIndex={index}
					onPress={() => onRoundSelect(index)}
					selectedRoundIndex={selectedRoundIndex}
				/>
			))}
		</ScrollView>
	);
};

export default RoundList;
