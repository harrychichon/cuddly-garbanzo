import { shadows, sizes, typography } from '@/design-tokens';
import { useAppTheme } from '@/hooks';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type MyButtonProps = {
	variant: 'positive' | 'negative' | 'neutral';
	onPress?: () => void;
	title?: string;
	disabled?: boolean;
};

const MyButton = ({
	onPress,
	title,
	variant,
	disabled = false,
}: Readonly<MyButtonProps>) => {
	const { theme } = useAppTheme();

	const getVariantColors = (
		variant: MyButtonProps['variant'],
		disabled: boolean
	) => {
		if (disabled) {
			return {
				backgroundColor: theme.colors.background || '#f5f5f5',
				opacity: 0.5,
			};
		}

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
		const variantColors = getVariantColors(variant, disabled);
		return StyleSheet.create({
			MyButton: {
				width: '100%',
				backgroundColor: variantColors.backgroundColor,
				borderRadius: sizes.radius?.full || 25,
				padding: sizes.base?.spacing || 16,
				margin: sizes.spacing?.sm || 8,
				opacity: variantColors.opacity || 1,
				...shadows.moderate,
			},
			text: {
				color: disabled ? '#999' : theme.colors.text,
				fontSize: typography.fontSize?.lg || 16,
				fontWeight: typography.fontWeight?.bold || 'bold',
				textAlign: 'center',
			},
		});
	}, [theme, variant, disabled]);

	return (
		<TouchableOpacity
			style={styles.MyButton}
			onPress={disabled ? undefined : onPress}
			disabled={disabled}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
};

export default MyButton;
