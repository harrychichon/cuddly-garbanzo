import { View } from '@/components/Themed';
import { sizes } from '@/design-tokens';
import { CreateTournamentWizard } from '@/screens/tournament-setup';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Screen from '@/components/Screen';

const TournamentSetup = () => {
	const { width } = useWindowDimensions();
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'flex-end',
			gap: 4,
			padding: sizes.base.spacing,
			width: width,
		},
	});
	return (
		<Screen type={'SafeAreaView'}>
			<View style={styles.container}>
				<CreateTournamentWizard />
			</View>
		</Screen>
	);
};

export default TournamentSetup;
