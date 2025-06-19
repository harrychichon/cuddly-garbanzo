import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import React from 'react';
import Screen from '../components/Screen';

export default function Home() {
	const router = useRouter();
	const handlePressCreate = () => {
		router.push({
			pathname: '/tournament-setup',
		});
	};
	const handlePressMyTournaments = () => {
		router.push({
			pathname: '/tournament-results',
		});
	};

	return (
		<Screen type={'SafeAreaView'}>
			<Button
				onPress={handlePressCreate}
				title='Skapa turnering'
				variant='positive'
			/>
			<Button
				onPress={handlePressMyTournaments}
				title='Mina turneringar'
				variant='positive'
			/>
		</Screen>
	);
}
