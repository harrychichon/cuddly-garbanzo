import LogoHeader from '@/components/LogoHeader/LogoHeader';
import { View } from '@/components/Themed';
import CardList from '@/components/tournament/CardList';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Home() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<LogoHeader />
				<CardList />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 4,
	},
});
