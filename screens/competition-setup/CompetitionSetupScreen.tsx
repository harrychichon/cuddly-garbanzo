import { Screen } from '@/components/';
import { sizes } from '@/design-tokens';
import { CreateCompetitionWizard } from '@/screens/competition-setup';
import { StyleSheet, View } from 'react-native';

const CompetitionSetupScreen = () => {
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
				<CreateCompetitionWizard />
			</View>
		</Screen>
	);
};

export default CompetitionSetupScreen;
