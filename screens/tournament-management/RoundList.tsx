import { View } from '@/components/Themed';
import Button from '@/components/Button';

type RoundListProps = {
	roundsCount: number[];
};

const RoundList = ({ roundsCount }: Readonly<RoundListProps>) => {
	return (
		<View>
			{roundsCount.map((number, index) => (
				<Button
					variant='positive'
					key={`${index}-${number}`}
					title={number.toString()}
				/>
			))}
		</View>
	);
};

export default RoundList;
