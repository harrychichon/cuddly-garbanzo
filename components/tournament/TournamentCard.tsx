import {
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

const TournamentCard = ({
	title,
	imageSource,
	description,
	onPress,
}: TournamentCardProps) => (
	<Pressable onPress={onPress}>
		<View style={[styles.card]}>
			<Text>{title}</Text>
			<Image
				source={imageSource}
				style={{ width: 100, height: 100 }}
			/>
			<Text>{description}</Text>
		</View>
	</Pressable>
);

const styles = StyleSheet.create({
	card: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderRadius: 8,
		padding: 16,
		margin: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
});

export default TournamentCard;
