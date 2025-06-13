import Button from '@/components/Button';
import InputText from '@/components/InputText';
import { View } from '@/components/Themed';
import { getTournamentFormat } from '@/configs';
import { sizes } from '@/design-tokens';
import CreateTournamentForm from '@/screens/tournament-setup/CreateTournamentForm/CreateTournamentForm';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateTournament() {
	const { formatType } = useLocalSearchParams();

	const selectedFormat = getTournamentFormat(formatType as string);

	if (!selectedFormat) {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					<Text>Invalid tournament format selected</Text>
				</View>
			</SafeAreaView>
		);
	}

	console.log('Selected format:', formatType);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<CreateTournamentForm
					selectedFormat={selectedFormat}
					onSubmit={() => {}}
				/>
				<InputText
					label='This is label'
					value='Value'
					onChangeText={() => undefined}
					defaultValue='Def. Value'
					maxLength={10}
				/>
				<Button
					title='Tillbaka'
					variant='negative'
				/>
				<Button
					title='Nästa'
					variant='positive'
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: 4,
		padding: sizes.base.spacing,
	},
});
