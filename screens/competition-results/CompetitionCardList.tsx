import { useCompetitionStore } from '@/stores/';
import { ScrollView, StyleSheet } from 'react-native';
import CompetitionCard from './CompetitionCard';

const CompetitionCardList = () => {
	const activeCompetitions = useCompetitionStore((s) => s.activeCompetitions);
	const completedCompetitions = useCompetitionStore(
		(s) => s.completedCompetitions
	);
	const allCompetitions = [...activeCompetitions, ...completedCompetitions];
	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}>
			{allCompetitions.map((competition) => (
				<CompetitionCard
					key={competition.id}
					competition={competition}
				/>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		gap: 12,
		width: '100%',
	},
});

export default CompetitionCardList;
