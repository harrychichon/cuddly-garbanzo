import { View } from '@/components/Themed';
import TournamentCard from '@/components/tournament/TournamentCard';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function TabOneScreen() {
	const router = useRouter();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<TournamentCard
					onPress={() => router.push('/create-tournament')}
					title='Americano'
					imageSource={require('@/assets/images/singles.jpg')}
					description='This is a description of Tournament 1'
				/>
				<TournamentCard
					onPress={() => router.push('/create-tournament')}
					title='Americano Doubles'
					imageSource={require('@/assets/images/doubles.jpg')}
					description='This is a description of Tournament 2'
				/>
				<TournamentCard
					title='Mexicano'
					imageSource={require('@/assets/images/singles.jpg')}
					description='This is a description of Tournament 1'
				/>
				<TournamentCard
					title='Mexicano Doubles'
					imageSource={require('@/assets/images/doubles.jpg')}
					description='This is a description of Tournament 2'
				/>
				<View
					style={styles.separator}
					lightColor='#eee'
					darkColor='rgba(255,255,255,0.1)'
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
