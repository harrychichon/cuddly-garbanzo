import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import React from 'react';
import Screen from '../components/Screen';

export default function Home() {
	const router = useRouter();
	const handlePress = () => {
		router.push({
			pathname: '/tournament-setup',
		});
	};

	return (
		<Screen type={'SafeAreaView'}>
			<Button
				onPress={handlePress}
				title='Skapa turnering'
				variant='positive'
			/>
		</Screen>
	);
}
