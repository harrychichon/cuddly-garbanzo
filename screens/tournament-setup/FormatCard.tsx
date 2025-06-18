import { shadows, sizes } from '@/design-tokens';
import { useAppTheme } from '@/hooks';
import { useMemo } from 'react';
import {
	Dimensions,
	Image,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';

type FormatCardProps = {
	title: string;
	description: string;
	imageSource: ImageSourcePropType;
	onPress?: (formatId: string) => void;
	formatId: string;
};

//TODO Abstrahera till egen fil
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const cardWidth = (screenWidth - sizes.base.spacing * 3) / 2;
const cardHeight = screenHeight * 0.3;

const FormatCard = ({
	title,
	imageSource,
	description,
	onPress,
	formatId,
}: Readonly<FormatCardProps>) => {
	const { theme } = useAppTheme();

	const styles = useMemo(
		() =>
			StyleSheet.create({
				card: {
					backgroundColor: theme.colors.card,
					color: theme.colors.text,
					height: cardHeight,
					width: cardWidth,
					alignItems: 'center',
					borderRadius: sizes.base.radius,
					padding: sizes.base.spacing,
					margin: sizes.spacing.sm,
					...shadows.moderate,
				},
				image: { width: 100, height: 100 },
				text: { color: theme.colors.text },
			}),
		[theme]
	);

	return (
		<Pressable onPress={() => onPress?.(formatId)}>
			<View style={styles.card}>
				<Text style={styles.text}>{title}</Text>
				<Image
					source={imageSource}
					style={styles.image}
				/>
				<Text style={styles.text}>{description}</Text>
			</View>
		</Pressable>
	);
};

export default FormatCard;
