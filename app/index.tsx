import Button from '@/components/MyButton';
import { useRouter } from 'expo-router';
import React from 'react';
import Screen from '../components/Screen';

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
			<Button
				onPress={handlePressCreate}
				title='Skapa tävling'
				variant='positive'
			/>
			<Button
				onPress={handlePressMyCompetitions}
				title='Mina tävlingar'
				variant='positive'
			/>
		</Screen>
	);
}
