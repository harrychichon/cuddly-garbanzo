import { StyleSheet, ScrollView } from 'react-native';
import { Tournament } from '@/types/types';
import TournamentCard from './TournamentCard';

type TournamentCardListProps = {
	tournaments: Tournament[];
};

const TournamentCardList = ({ tournaments }: TournamentCardListProps) => {
	//TODO onPress => expand och visa resultattabell, samt en knapp för att ta användaren till tournament-management-vy utan redigering
	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}>
			{tournaments.map((tournament) => (
				<TournamentCard
					key={tournament.id}
					tournament={tournament}
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

export default TournamentCardList;
