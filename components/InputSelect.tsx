import { useAppTheme } from '@/hooks';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type SelectFieldRendererProps<T = any> = {
	option: { value: T; label: string };
	isSelected: boolean;
	onSelect: (value: T) => void;
};

const SelectFieldRenderer = ({
	option,
	isSelected,
	onSelect,
}: Readonly<SelectFieldRendererProps>) => {
	const { theme } = useAppTheme();

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
		[theme]
	);
	return (
		<TouchableOpacity
			onPress={() => onSelect(option.value)}
			style={styles.select}>
			<Text style={styles.text}>{option.label}</Text>
		</TouchableOpacity>
	);
};

export default SelectFieldRenderer;
