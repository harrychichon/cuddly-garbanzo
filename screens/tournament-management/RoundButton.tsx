import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';
import isSelected from '@/utils/isSelected';

type RoundButtonProps = {
	title: string;
	roundIndex: number;
	onPress: () => void;
	selectedRoundIndex: number;
};

const RoundButton = ({
	title,
	roundIndex,
	onPress,
	selectedRoundIndex,
}: Readonly<RoundButtonProps>) => {
	const selected = isSelected(
		selectedRoundIndex.toString(),
		roundIndex.toString()
	);

	return (
		<TouchableOpacity
			style={[styles.button, selected && styles.selectedButton]}
			onPress={onPress}>
			<Text style={[styles.text, selected && styles.selectedText]}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#e0e0e0',
		padding: 12,
		borderRadius: 8,
		minWidth: 60,
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedButton: {
		backgroundColor: '#007AFF',
	},
	text: {
		fontSize: 16,
		fontWeight: '500',
		color: '#000',
	},
	selectedText: {
		color: '#fff',
	},
});

export default RoundButton;
