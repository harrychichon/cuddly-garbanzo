import Screen from '@/components/Screen';
import { sizes } from '@/design-tokens';
import { CreateTournamentWizard } from '@/screens/tournament-setup';
import { StyleSheet, View } from 'react-native';

const TournamentSetupScreen = () => {
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
				<CreateTournamentWizard />
			</View>
		</Screen>
	);
};

export default TournamentSetupScreen;
