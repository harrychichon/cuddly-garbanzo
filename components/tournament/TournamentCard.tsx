import { shadows, sizes } from '@/design-tokens';
import { useAppTheme } from '@/hooks';
import {
	Dimensions,
	Image,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';

type TournamentCardProps = {
	title: string;
	description: string;
	imageSource: ImageSourcePropType;
	onPress?: () => void;
};
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const cardWidth = (screenWidth - sizes.base.spacing * 3) / 2;
const cardHeight = screenHeight * 0.3;

const TournamentCard = ({
	title,
	imageSource,
	description,
	onPress,
}: TournamentCardProps) => {
	const { colors: themeColors } = useAppTheme();

	return (
		<Pressable onPress={onPress}>
			<View
				style={[
					styles.card,
					{
						backgroundColor: themeColors.colors.background,
					},
				]}>
				<Text style={{ color: themeColors.colors.text }}>{title}</Text>
				<Image
					source={imageSource}
					style={{ width: 100, height: 100 }}
				/>
				<Text style={{ color: themeColors.colors.text }}>{description}</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	card: {
		height: cardHeight,
		width: cardWidth,
		alignItems: 'center',
		borderRadius: sizes.base.radius,
		padding: sizes.base.spacing,
		margin: sizes.spacing.sm,
		...shadows.moderate,
	},
});

export default TournamentCard;
