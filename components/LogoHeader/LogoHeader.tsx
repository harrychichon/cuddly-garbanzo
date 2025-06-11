import { sizes } from '@/design-tokens';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const LogoHeader = () => {
	return (
		<View style={styles.container}>
			<Image
				source={require('../../assets/images/singles.jpg')}
				style={{ width: 100, height: 100 }}
			/>
			<Text>Tagline goes here</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: sizes.base.spacing,
	},
});

export default LogoHeader;
