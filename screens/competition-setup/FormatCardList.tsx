import { CompetitionFormat, getAvailableFormats } from '@/configs';
import { sizes } from '@/design-tokens';
import { useAppTheme } from '@/hooks';
import { FormatCard } from '@/screens/competition-setup';
import { useMemo } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

type FormatCardListProps = {
	onPress?: (formatType: string) => void;
};

const AVAILABLE_FORMATS = getAvailableFormats();

const FormatCardList = ({ onPress }: Readonly<FormatCardListProps>) => {
	const { theme } = useAppTheme();

	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {
					width: '100%',
					justifyContent: 'center',
					alignItems: 'stretch',
				},
				emptyText: {
					textAlign: 'center',
					marginTop: sizes.base.spacing,
				},
			}),
		[theme]
	);

	const renderCard = (item: CompetitionFormat & { formatId: string }) => (
		<FormatCard
			key={item.formatId}
			formatId={item.formatId}
			onPress={onPress}
			title={item.name}
			imageSource={item.image}
			description={item.summary}
		/>
	);

	const renderEmpty = () => (
		<Text style={styles.emptyText}>Inga aktiva spelformer tillgängliga.</Text>
	);

	return (
		<FlatList
			data={AVAILABLE_FORMATS}
			renderItem={({ item }) => renderCard(item)}
			keyExtractor={(item) => item.name}
			contentContainerStyle={styles.container}
			ListEmptyComponent={renderEmpty}
			showsVerticalScrollIndicator={false}
			scrollEnabled={false}
		/>
	);
};

export default FormatCardList;
