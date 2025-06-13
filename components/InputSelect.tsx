import { useAppTheme } from '@/hooks';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type InputSelectProps<T = any> = {
	option: { value: T; label: string };
	value: T;
	onPress: (value: T) => void;
};

const InputSelect = <T,>({
	option,
	value,
	onPress,
}: Readonly<InputSelectProps<T>>) => {
	const { theme } = useAppTheme();
	const isSelected = value === option.value;
	const styles = useMemo(
		() =>
			StyleSheet.create({
				select: {
					padding: theme.sizes.spacing.sm,
					backgroundColor: isSelected
						? theme.colors.primary
						: theme.colors.white,
					margin: theme.sizes.spacing.xs,
					borderRadius: theme.sizes.radius.sm,
				},
				text: {
					color: isSelected ? theme.colors.white : theme.colors.black,
				},
			}),
		[theme, isSelected]
	);
	return (
		<TouchableOpacity
			onPress={() => onPress(option.value)}
			style={styles.select}>
			<Text style={styles.text}>{option.label}</Text>
		</TouchableOpacity>
	);
};

export default InputSelect;
