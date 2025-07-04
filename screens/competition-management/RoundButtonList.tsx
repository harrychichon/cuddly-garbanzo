import { Match } from '@/types/';
import { ScrollView } from 'react-native';
import RoundButton from './RoundButton';

type RoundButtonListProps = {
	rounds: Match[][];
	onRoundSelect: (roundIndex: number) => void;
	selectedRoundIndex: number;
};

const RoundButtonList = ({
	rounds,
	onRoundSelect,
	selectedRoundIndex,
}: Readonly<RoundButtonListProps>) => {
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

export default RoundButtonList;
