import { ACTIVE_TOURNAMENT_FORMATS_CONFIG } from '@/configs';
import { TournamentFormat } from '@/constants';
import { sizes } from '@/design-tokens';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text } from 'react-native';
import TournamentCard from './TournamentCard';

type CardListProps = {
	children?: React.ReactNode;
};

const CardList = ({ children }: CardListProps) => {
	const formats = Object.values(ACTIVE_TOURNAMENT_FORMATS_CONFIG ?? {});
	const router = useRouter();

	const renderCard = (item: TournamentFormat) => (
		<TournamentCard
			key={item.name}
			onPress={() => router.push('/create-tournament')}
			title={item.name}
			imageSource={item.image}
			description={item.summary}
		/>
	);

	const renderEmpty = () => (
		<Text style={styles.emptyText}>
			No active tournament formats available.
		</Text>
	);

	return (
		<FlatList
			data={formats}
			renderItem={({ item }) => renderCard(item)}
			keyExtractor={(item) => item.name}
			numColumns={2}
			contentContainerStyle={styles.container}
			ListEmptyComponent={renderEmpty}
			showsVerticalScrollIndicator={false}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	emptyText: {
		textAlign: 'center',
		marginTop: sizes.base.spacing,
	},
});

export default CardList;
