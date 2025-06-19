import { shadows, sizes } from '@/design-tokens';
import { useAppTheme } from '@/hooks';
import { ReactNode, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type CardProps = {
	title?: string;
	description?: string;
	children?: ReactNode;
};

const Card = ({ title, description, children }: Readonly<CardProps>) => {
	const { theme } = useAppTheme();

	const styles = useMemo(
		() =>
			StyleSheet.create({
				card: {
					backgroundColor: theme.colors.card,
					color: theme.colors.text,
					width: '100%',
					alignItems: 'center',
					borderRadius: sizes.base.radius,
					padding: sizes.base.spacing,
					...shadows.moderate,
				},
				title: {
					color: theme.colors.text,
					fontSize: theme.typography.fontSize.xl,
				},
				desc: {
					color: theme.colors.text,
					fontSize: theme.typography.fontSize.md,
				},
			}),
		[theme]
	);

	return (
		<View style={styles.card}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.desc}>{description}</Text>
			{children}
		</View>
	);
};

export default Card;
