import { useAppTheme } from '@/hooks';
import { useMemo } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type TextInputProps = {
	label: string;
	value: string;
	onChangeText: (text: string) => void;
	defaultValue: string;
	maxLength: number;
};

const InputText = ({
	label,
	value,
	onChangeText,
	defaultValue,
	maxLength,
}: Readonly<TextInputProps>) => {
	const { theme } = useAppTheme();

	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: { width: '100%', gap: theme.sizes.spacing.sm },
				label: {
					color: theme.colors.text,
				},
				input: {
					width: '100%',
					borderRadius: theme.sizes.base.radius,
					backgroundColor: theme.colors.white,
					paddingStart: theme.sizes.base.spacing,
					borderWidth: theme.sizes.base.border,
					borderColor: theme.colors.border,
				},
			}),
		[theme]
	);

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={onChangeText}
				defaultValue={defaultValue}
				maxLength={maxLength}
			/>
		</View>
	);
};

export default InputText;
