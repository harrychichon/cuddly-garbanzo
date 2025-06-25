import { Text } from '@/components/';
import { useAppTheme } from '@/hooks';
import { isSelected } from '@/utils';
import { StyleSheet, TouchableOpacity } from 'react-native';

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
	const { theme } = useAppTheme();
	const selected = isSelected(
		selectedRoundIndex.toString(),
		roundIndex.toString()
	);

	const styles = StyleSheet.create({
		button: {
			backgroundColor: theme.colors.secondary,
			padding: 12,
			borderRadius: 8,
			minWidth: 60,
			alignItems: 'center',
			justifyContent: 'center',
		},
		selectedButton: {
			backgroundColor: theme.colors.cta,
		},
		text: {
			fontSize: 16,
			fontWeight: '500',
			color: '#000',
		},
		selectedText: {
			color: '#fff',
			fontWeight: theme.typography.fontWeight.extrabold,
		},
	});

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

export default RoundButton;
