import Screen from '@/components/Screen';
import { View } from '@/components/Themed';
import { sizes } from '@/design-tokens';
import CompetitionCardList from '@/screens/competition-results/CompetitionCardList';
import React from 'react';
import { StyleSheet } from 'react-native';

const CompetitionResultsScreen = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'flex-end',
			gap: 4,
			padding: sizes.base.spacing,
			width: '100%',
		},
	});
	return (
		<Screen type={'SafeAreaView'}>
			<View style={styles.container}>
				<CompetitionCardList />
			</View>
		</Screen>
	);
};

export default CompetitionResultsScreen;
