import { shadows, sizes, typography } from '@/design-tokens';
import { useAppTheme } from '@/hooks';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
	variant: 'positive' | 'negative' | 'neutral';
	onPress?: () => void;
	title?: string;
};

const Button = ({ onPress, title, variant }: Readonly<ButtonProps>) => {
	const { theme } = useAppTheme();

	const getVariantColors = (variant: ButtonProps['variant']) => {
		switch (variant) {
			case 'positive':
				return {
					backgroundColor: theme.colors.secondary,
				};
			case 'negative':
				return {
					backgroundColor: theme.colors.primary,
				};
			case 'neutral':
			default:
				return {
					backgroundColor: theme.colors.background,
				};
		}
	};

	const styles = useMemo(() => {
		const variantColors = getVariantColors(variant);

		return StyleSheet.create({
			button: {
				width: '100%',
				backgroundColor: variantColors.backgroundColor,
				borderRadius: sizes.radius.full,
				padding: sizes.base.spacing,
				margin: sizes.spacing.sm,
				...shadows.moderate,
			},
			text: {
				color: theme.colors.text,
				fontSize: typography.fontSize.lg,
				fontWeight: typography.fontWeight.bold,
				textAlign: 'center',
			},
		});
	}, [theme, variant]);

	return (
		<TouchableOpacity
			style={styles.button}
			onPress={onPress}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
};

export default Button;
