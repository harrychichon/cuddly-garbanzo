import { MyButton, Screen } from '@/components/';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function Home() {
	const router = useRouter();
	const handlePressCreate = () => {
		router.push({
			pathname: '/competition-setup',
		});
	};
	const handlePressMyCompetitions = () => {
		router.push({
			pathname: '/competition-results',
		});
	};

	return (
		<Screen type={'SafeAreaView'}>
			<Text>Spelarens schema kommer här.</Text>
			<MyButton
				onPress={handlePressCreate}
				title='Skapa tävling'
				variant='positive'
			/>
			<MyButton
				onPress={handlePressMyCompetitions}
				title='Mina tävlingar'
				variant='positive'
			/>
		</Screen>
	);
}
