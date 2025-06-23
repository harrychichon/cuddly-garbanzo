import Screen from '@/components/Screen';
import { sizes } from '@/design-tokens';
import { StyleSheet, View } from 'react-native';
import CreateCompetitionWizard from './CreateCompetitionWizard/CreateCompetitionWizard';

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
