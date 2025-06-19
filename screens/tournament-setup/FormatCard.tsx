import Card from '@/components/Card';
import { ImageSourcePropType, Pressable } from 'react-native';

type FormatCardProps = {
	title: string;
	description: string;
	imageSource: ImageSourcePropType;
	onPress?: (formatId: string) => void;
	formatId: string;
};

const FormatCard = ({
	title,
	onPress,
	formatId,
}: Readonly<FormatCardProps>) => {
	return (
		<Pressable onPress={() => onPress?.(formatId)}>
			<Card title={title} />
		</Pressable>
	);
};

export default FormatCard;
